// ✅ API 서버 주소 (환경에 맞게 수정)
const API_BASE_URL = "https://your-api-server.com";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const btn = document.getElementById("loginBtn");
  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value.trim();
  const rememberMe = document.getElementById("rememberMe");

  // 🛠 입력 검증
  if (!userId || !password) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }
  if (userId.length < 4 || password.length < 6) {
    alert("아이디는 4자 이상, 비밀번호는 6자 이상 입력하세요.");
    return;
  }

  try {
    // ⏳ 중복 클릭 방지
    btn.disabled = true;

    // 📡 서버 요청
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password })
    });

    if (response.ok) {
      const data = await response.json();

      // ✅ 토큰 저장 (자동로그인 여부에 따라 localStorage / sessionStorage 선택)
      const storage = rememberMe && rememberMe.checked ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("userId", userId);

      // ⏳ 토큰 만료 시간 기록
      try {
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        storage.setItem("token_exp", payload.exp);
      } catch (err) {
        console.warn("⚠️ 토큰 파싱 실패:", err);
      }

      // 🎉 로그인 성공 시 → 성공 화면으로 이동
      window.location.href = "/success.html";
    } else {
      // ⚠️ 서버에서 제공한 오류 메시지 출력
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.message || "로그인 실패. 아이디/비밀번호를 확인하세요.");

      // ❌ 로그인 실패 시 → 실패 화면으로 이동
      window.location.href = "/fail.html";
    }
  } catch (err) {
    console.error("❌ 로그인 오류:", err);
    alert("네트워크 오류 발생");

    // ⚠️ 네트워크 오류도 실패 화면으로 이동
    window.location.href = "/fail.html";
  } finally {
    // ⏳ 버튼 다시 활성화
    btn.disabled = false;
  }
});


