const chatMessages = document.querySelector("#chat-messages");
const userInput = document.querySelector("#user-input input");
const sendButton = document.querySelector("#user-input button");

const apiEndpoint = "https://api.openai.com/v1/chat/completions"; // OpenAI GPT API 엔드포인트
const apiKey = "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"; // OpenAI API 키

sendButton.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (message.length === 0) return;

  addMessage("나", message); // 사용자 입력 메시지 화면에 추가

  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
        stop: ["Human"],
      }),
    };

    const response = await fetch(apiEndpoint, requestOptions);
    if (!response.ok) {
      throw new Error("서버에서 오류가 발생했습니다.");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    addMessage("챗봇", aiResponse); // 챗봇 응답 메시지 화면에 추가
  } catch (error) {
    console.error("서버 요청 중 오류 발생:", error);
    addMessage("챗봇", "서버와의 통신 중 오류가 발생했습니다.");
  }

  userInput.value = ""; // 입력 필드 초기화
});

userInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // 기본 엔터 행동 막기
    const message = userInput.value.trim();
    if (message.length === 0) return;

    addMessage("나", message); // 사용자 입력 메시지 화면에 추가

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
          top_p: 0.9,
          frequency_penalty: 0.5,
          presence_penalty: 0.3,
          stop: ["Human"],
        }),
      };

      const response = await fetch(apiEndpoint, requestOptions);
      if (!response.ok) {
        throw new Error("서버에서 오류가 발생했습니다.");
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      addMessage("챗봇", aiResponse); // 챗봇 응답 메시지 화면에 추가
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
      addMessage("챗봇", "서버와의 통신 중 오류가 발생했습니다.");
    }

    userInput.value = ""; // 입력 필드 초기화
  }
});

function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = `${sender}: ${message}`;
  chatMessages.prepend(messageElement);
}
