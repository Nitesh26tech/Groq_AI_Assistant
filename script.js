async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  input.value = "";

  // typing indicator
  const typingId = addMessage("Typing...", "bot");

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // remove typing
    document.getElementById(typingId).remove();

    addMessage(data.reply, "bot");
  } catch (err) {
    addMessage("Server error 😢", "bot");
  }
}

function addMessage(text, type) {
  const chatBox = document.getElementById("chatbox");

  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerText = text;

  const id = "msg-" + Date.now();
  msg.id = id;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;

  return id;
}

// ENTER key support
document.getElementById("input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
