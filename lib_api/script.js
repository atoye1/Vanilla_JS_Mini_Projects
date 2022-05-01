
const booksElem = document.querySelector("#books");
const page = 1;
const key = "%2FbFeirMmNDzYg70ob5u8zSXfeq8agzNnPtXZy4EZhJbri2i5uwG8Xf95BWuebdwkcHpZnuKakHFslckYdnb0yA%3D%3D";
const url2 = `https://apis.data.go.kr/6260000/BookLoanBestService/getBookLoanBest?serviceKey=${key}&numOfRows=50&pageNo=${page}&resultType=json`;

fetch(url2)
    .then(res => res.json())
    .then(data => {
        data['getBookLoanBest']['item'].forEach(makeBookElem);
    });

function makeBookElem(data) {
    const title = data['title'];
    const author = data['author'];
    const year = data['publish_year'];
    const bookElem = document.createElement('div');
    bookElem.classList.add('book');
    bookElem.innerHTML = `<div>${title}</div><div>${author}</div><div>${year}</div>`;
    booksElem.appendChild(bookElem);
}