document.addEventListener("DOMContentLoaded", () => {
  const chatbot = document.getElementById("chatbot");
  const closeChat = document.getElementById("closeChat");
  const chatBody = document.getElementById("chatBody");
  const assistanceLink = document.getElementById("assistanceLink");
  const openButtons = document.querySelectorAll(".open-chat");
  const chatOptions = document.querySelectorAll(".chat-option");
  const cursorGlow = document.querySelector(".cursor-glow");

  openButtons.forEach(button => {
    button.addEventListener("click", () => {
      chatbot.classList.add("active");
    });
  });

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatbot.classList.remove("active");
    });
  }

  chatOptions.forEach(option => {
    option.addEventListener("click", () => {
      const choice = option.dataset.choice;

      appendUserMessage(choice);
      appendBotMessage(`Très bien. Vous avez choisi : ${choice}.`);
      appendBotMessage("Souhaitez-vous être mis en relation avec l’assistance pour finaliser la demande ?");

      const actionWrap = document.createElement("div");
      actionWrap.className = "chat-options";

      const yesBtn = document.createElement("button");
      yesBtn.className = "chat-option";
      yesBtn.textContent = "Oui, contacter l’assistance";

      const noBtn = document.createElement("button");
      noBtn.className = "chat-option";
      noBtn.textContent = "Voir d’autres services";

      yesBtn.addEventListener("click", () => {
        appendUserMessage("Oui, contacter l’assistance");
        appendBotMessage("Parfait. Je vous redirige vers le contact pour finaliser votre demande.");
        if (assistanceLink) {
          assistanceLink.href = `contact.html?service=${encodeURIComponent(choice)}`;
          assistanceLink.textContent = `Continuer avec l’assistance – ${choice}`;
        }
      });

      noBtn.addEventListener("click", () => {
        appendUserMessage("Voir d’autres services");
        appendBotMessage("Vous pouvez consulter la page des services ou sélectionner une autre prestation.");
      });

      chatBody.appendChild(actionWrap);
      actionWrap.appendChild(yesBtn);
      actionWrap.appendChild(noBtn);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  });

  function appendUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  document.addEventListener("mousemove", (e) => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
});
