import "../user/userChatComponent.css";

const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>For Bonus chat function</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
            {/* just to see how it will lookh */}
            {Array.from({ length: 20 }).map((_, id) => (
              <div key ={id}>
                <p>
                  <b>You wrote:</b> Hello, world! this is an example message.
                </p>
                <p className="bg-warning p-3 ms-4 text-light rounded-pill">
                  <b>Support wrote:</b> Hello , user this is an example
                  response!
                </p>
              </div>
            ))}
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your message"
          ></textarea>
          <button
            className="btn btn-warning  btn-block"
            style={{ width: "100%" }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
