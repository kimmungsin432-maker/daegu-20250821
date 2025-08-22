// API 서버 주소 (환경에 맞게 수정)
const API_BASE_URL = "https://your-api-server.com";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!userId || !password) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password })
    });

    if (response.ok) {
      const data = await response.json();
      // ✅ JWT 토큰 or 사용자 ID 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", userId);

      alert("로그인 성공!");
      window.location.href = "/index.html"; // 로그인 후 메인으로 이동
    } else {
      alert("로그인 실패. 아이디/비밀번호를 확인하세요.");
    }
  } catch (err) {
    console.error("❌ 로그인 오류:", err);
    alert("네트워크 오류 발생");
  }
});
