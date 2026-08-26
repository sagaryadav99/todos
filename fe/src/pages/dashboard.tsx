import { useRef, useState } from "react";
import { useGetPost } from "../hooks/getPost";
import { useAddPost } from "../hooks/addpost";
import { useDeletePost } from "../hooks/deletepost";
import { useTogglePost } from "../hooks/togglepost";
import { useUpdatePost } from "../hooks/updatepost";

export function Dashboard() {
  const token = localStorage.getItem("token");
  const titleref = useRef<HTMLInputElement | null>(null);
  const descriptionref = useRef<HTMLInputElement | null>(null);
  const { data, isLoading, isError } = useGetPost(token as string);
  const mutation = useAddPost();
  const deletemutation = useDeletePost();
  const togglemutation = useTogglePost();
  const updatemutation = useUpdatePost();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  if (isLoading) {
    return (
      <main className="dashboard-state">
        <div className="loading-spinner"></div>
        <div>loading</div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="dashboard-state">
        <div className="error-icon">!</div>
        <div>some error occured</div>
      </main>
    );
  }

  console.log(data);

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-badge">Your workspace</div>
        <h1 className="dashboard-title">My Tasks</h1>
        <p className="dashboard-subtitle">
          Stay organized and keep moving forward.
        </p>
      </div>

      <div className="todo-create">
        <input
          className="todo-input"
          ref={titleref}
          placeholder="What needs to be done?"
        />

        <input
          className="todo-input"
          ref={descriptionref}
          placeholder="Add a description..."
        />

        <button
          className="btn btn-primary add-btn"
          onClick={() => {
            if (!titleref.current?.value || !descriptionref.current?.value) {
              return;
            }

            mutation.mutate({
              title: titleref.current.value,
              description: descriptionref.current.value,
            });
          }}
        >
          + Add task
        </button>
      </div>

      <div className="todo-list">
        {data.map((x: any) => {
          const isEditing = editingId === x.id;

          return (
            <div
              className={`todo-item ${
                x.completed ? "todo-item-completed" : ""
              }`}
              key={x.id}
            >
              {isEditing ? (
                <>
                  <div className="edit-fields">
                    <input
                      className="todo-input"
                      value={editTitle}
                      onChange={(e) => {
                        setEditTitle(e.target.value);
                      }}
                    />

                    <input
                      className="todo-input"
                      value={editDescription}
                      onChange={(e) => {
                        setEditDescription(e.target.value);
                      }}
                    />
                  </div>

                  <div className="todo-footer">
                    <div />

                    <div className="todo-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (!editTitle || !editDescription) {
                            return;
                          }

                          updatemutation.mutate({
                            id: x.id,
                            title: editTitle,
                            description: editDescription,
                          });

                          setEditingId(null);
                        }}
                      >
                        Save
                      </button>

                      <button
                        className="icon-btn"
                        onClick={() => {
                          setEditingId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="todo-main">
                    <div
                      className="todo-content"
                      style={{
                        textDecoration: x.completed ? "line-through" : "none",
                      }}
                    >
                      <div className="todo-title">{x.title}</div>

                      <div className="todo-description">{x.description}</div>
                    </div>

                    <div className="todo-status">
                      <span
                        className={
                          x.completed
                            ? "status-badge status-completed"
                            : "status-badge"
                        }
                      >
                        {x.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="todo-footer">
                    <label className="checkbox-wrapper">
                      <input
                        className="todo-checkbox"
                        type="checkbox"
                        checked={x.completed}
                        onChange={(e) => {
                          togglemutation.mutate({
                            id: x.id,
                            completed: e.target.checked,
                          });
                        }}
                      />

                      <span>Mark as complete</span>
                    </label>

                    <div className="todo-actions">
                      <button
                        className="icon-btn edit-btn"
                        onClick={() => {
                          setEditingId(x.id);
                          setEditTitle(x.title);
                          setEditDescription(x.description);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="icon-btn delete-btn"
                        onClick={() => {
                          deletemutation.mutate({ id: x.id });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
