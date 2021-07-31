// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
      const id = el.querySelector('td').textContent;
      getComment(id);
    });
  });
  // 사용자 로딩
  async function getUser() {
    try {
      const res = await axios.get('/users');
      const users = res.data;
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
          getComment(user.id);
        });
        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = user.mail;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.nickName;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.password;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.studentId;
        row.appendChild(td);

        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }


  // 사용자 등록 시
  document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userID = e.target.userID.value;
    const password = e.target.password.value;
    const userName = e.target.userName.value;
    const studentID = e.target.studentID.value;

    if (!mail) {
      return alert('이메일을 입력하세요');
    }
    if (!password) {
      return alert('비밀번호를 입력하세요');
    }

    if (!nickName) {
      return alert('닉네임을 입력하세요');
    }

    if (!studentId) {
      return alert('학번을 입력하세요');
    }


    try {
      await axios.post('/users', { mail, password, nickName, studentId});
      getUser();
    } catch (err) {
        console.error(err);
      }

    e.target.mail.value = '';
    e.target.password.value = '';
    e.target.nickName.value = '';
    e.target.studentId.value = '';

  });
