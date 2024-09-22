"use strict";

document.getElementById("id").addEventListener('input', (e) => {
    e.target.value = e.target.value.slice(0,30).replace(/[^a-zA-Z0-9]/g, ''); //영문,숫자 조합 0~30자 입력할 수 있도록 정규식
});

const id = document.querySelector("#id"),
    confirmId = document.querySelector("#confirm-id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    confirmPsword = document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#button"),
    checkIdBtn = document.querySelector("#check-id");

registerBtn.addEventListener("click", register);
checkIdBtn.addEventListener("click", checkId);


function register() {

    if (!id.value) return alert("아이디를 입력해 주세요.");
    if (psword.value !== confirmPsword.value) 
        return alert("비밀번호가 일치하지 않습니다.");
    if (id.value !== confirmId.value) return alert("아이디 중복확인을 해주세요.");
    

    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
    }

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            alert(res.msg);
            location.href = "/login";
        } else {
            if (res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(("회원가입 중 에러 발생"));
    });
}

function checkId() {
    if (!id.value) return alert("아이디를 입력해 주세요.");
    const req = { id: id.value }

    fetch("/checkId", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.err) return alert(res.err);
        if (res.success === true) {
            confirmId.value = id.value;
        } else {
            confirmId.value = "";
        }
        alert(res.msg);
    })
    .catch((err) => {
        console.error("아이디 중복체크 중 에러 발생");
    });
}