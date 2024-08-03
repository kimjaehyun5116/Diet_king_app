const url = "https://diet-king.netlify.app/";

function setShare() {
  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "다킹(Diet-King)",
      description: "식단, 다이어트식단, 벌크업, 무료 식단만들기",
      imageUrl: "https://diet-king.netlify.app/img/main.png",
      link: {
        mobileWebUrl: "http://developers.kakao.com",
        webUrl: "http://developers.kakao.com",
      },
    },

    buttons: [
      {
        title: "식단만들러가기",
        link: {
          mobileWebUrl: "http://developers.kakao.com",
          webUrl: "http://developers.kakao.com",
        },
      },
    ],
  });
}
