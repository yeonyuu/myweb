/* ==================================================
   페이지
================================================== */

const introPage =
    document.getElementById(
        "introPage"
    );

const selectPage =
    document.getElementById(
        "selectPage"
    );

const editorPage =
    document.getElementById(
        "editorPage"
    );

const completePage =
    document.getElementById(
        "completePage"
    );


function showPage(page) {

    introPage.classList.remove(
        "active"
    );

    selectPage.classList.remove(
        "active"
    );

    editorPage.classList.remove(
        "active"
    );

    completePage.classList.remove(
        "active"
    );

    page.classList.add(
        "active"
    );
}


/* ==================================================
   인트로
================================================== */

const envelope =
    document.getElementById(
        "envelope"
    );


function playIntroAnimation() {

    envelope.classList.remove(
        "insert",
        "letter-hidden",
        "closed"
    );


    setTimeout(
        function () {

            envelope.classList.add(
                "insert"
            );

        },
        1200
    );


    setTimeout(
        function () {

            envelope.classList.add(
                "letter-hidden"
            );

        },
        3050
    );


    setTimeout(
        function () {

            envelope.classList.add(
                "closed"
            );

        },
        3350
    );
}


playIntroAnimation();


setInterval(
    function () {

        if (
            introPage.classList.contains(
                "active"
            )
        ) {

            playIntroAnimation();

        }

    },
    8000
);


/* ==================================================
   요소
================================================== */

const cardText =
    document.getElementById(
        "cardText"
    );

const previewText =
    document.getElementById(
        "previewText"
    );

const cardPreview =
    document.getElementById(
        "cardPreview"
    );

const paperSheet =
    document.getElementById(
        "paperSheet"
    );

const imageInput =
    document.getElementById(
        "imageInput"
    );

const previewImage =
    document.getElementById(
        "previewImage"
    );

const trashZone =
    document.getElementById(
        "trashZone"
    );

const fontRadios =
    document.querySelectorAll(
        'input[name="font"]'
    );


/* ==================================================
   카드 시작
================================================== */

document
    .getElementById(
        "startBtn"
    )
    .addEventListener(
        "click",
        function () {

            showPage(
                selectPage
            );

        }
    );


/* ==================================================
   카드 종류
================================================== */

document
    .querySelectorAll(
        ".card-option"
    )
    .forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    const theme =
                        this.dataset.theme;


                    if (
                        theme === "pink"
                    ) {

                        cardPreview.style.background =
                            "linear-gradient(135deg,#ffd5e0,#ffa4be)";

                    }

                    else if (
                        theme === "cream"
                    ) {

                        cardPreview.style.background =
                            "linear-gradient(135deg,#fff5da,#f3ddaa)";

                    }

                    else {

                        cardPreview.style.background =
                            "linear-gradient(135deg,#eee5ff,#ccb6fb)";

                    }


                    showPage(
                        editorPage
                    );

                }
            );

        }
    );


/* ==================================================
   문구
================================================== */

cardText.addEventListener(
    "input",
    function () {

        const value =
            this.value;


        if (
            value.trim() === ""
        ) {

            previewText.textContent =
                "전하고 싶은 마음을 작성해주세요 💕";


            previewText.classList.add(
                "placeholder-text"
            );

        }

        else {

            previewText.textContent =
                value;


            previewText.classList.remove(
                "placeholder-text"
            );

        }

    }
);


/* ==================================================
   폰트
================================================== */

fontRadios.forEach(
    function (radio) {

        radio.addEventListener(
            "change",
            function () {

                if (
                    this.value === "default"
                ) {

                    previewText.style.fontFamily =
                        "'Pretendard', sans-serif";

                }

                else if (
                    this.value === "poor"
                ) {

                    previewText.style.fontFamily =
                        "'Poor Story', system-ui";

                }

                else if (
                    this.value === "pen"
                ) {

                    previewText.style.fontFamily =
                        "'Nanum Pen Script', cursive";

                }

                else if (
                    this.value === "single"
                ) {

                    previewText.style.fontFamily =
                        "'Single Day', cursive";

                }

                else if (
                    this.value === "coding"
                ) {

                    previewText.style.fontFamily =
                        "'Nanum Gothic Coding', monospace";

                }

            }
        );

    }
);


/* ==================================================
   편지지
================================================== */

const paperClasses = [
    "paper-plain",
    "paper-lined",
    "paper-dots",
    "paper-grid",
    "paper-heart",
    "paper-flower"
];


document
    .querySelectorAll(
        'input[name="paperStyle"]'
    )
    .forEach(
        function (radio) {

            radio.addEventListener(
                "change",
                function () {

                    paperSheet.classList.remove(
                        ...paperClasses
                    );


                    paperSheet.classList.add(
                        "paper-" + this.value
                    );

                }
            );

        }
    );


/* ==================================================
   이미지 업로드
================================================== */

imageInput.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                previewImage.src =
                    event.target.result;


                previewImage.style.display =
                    "block";


                previewImage.style.left =
                    "50%";


                previewImage.style.top =
                    "27%";

            };


        reader.readAsDataURL(
            file
        );

    }
);


/* ==================================================
   이미지 삭제
================================================== */

function removeImage() {

    previewImage.removeAttribute(
        "src"
    );


    previewImage.style.display =
        "none";


    imageInput.value =
        "";


    previewImage.style.left =
        "50%";


    previewImage.style.top =
        "27%";


    trashZone.classList.remove(
        "show",
        "active"
    );
}


/* ==================================================
   이미지 드래그
================================================== */

let dragging =
    false;

let dragOffsetX =
    0;

let dragOffsetY =
    0;


previewImage.addEventListener(
    "pointerdown",
    function (event) {

        dragging =
            true;


        const imageRect =
            previewImage
                .getBoundingClientRect();


        dragOffsetX =
            event.clientX
            -
            imageRect.left
            -
            imageRect.width / 2;


        dragOffsetY =
            event.clientY
            -
            imageRect.top
            -
            imageRect.height / 2;


        previewImage.setPointerCapture(
            event.pointerId
        );


        previewImage.style.cursor =
            "grabbing";

    }
);


previewImage.addEventListener(
    "pointermove",
    function (event) {

        if (!dragging) {
            return;
        }


        const paperRect =
            paperSheet
                .getBoundingClientRect();


        const imageRect =
            previewImage
                .getBoundingClientRect();


        if (
            event.clientY >
            paperRect.bottom - 70
        ) {

            trashZone.classList.add(
                "show"
            );

        }

        else {

            trashZone.classList.remove(
                "show",
                "active"
            );

        }


        const trashRect =
            trashZone
                .getBoundingClientRect();


        const overTrash =

            event.clientX >=
            trashRect.left

            &&

            event.clientX <=
            trashRect.right

            &&

            event.clientY >=
            trashRect.top

            &&

            event.clientY <=
            trashRect.bottom;


        if (overTrash) {

            trashZone.classList.add(
                "active"
            );

        }

        else {

            trashZone.classList.remove(
                "active"
            );

        }


        let x =
            event.clientX
            -
            paperRect.left
            -
            dragOffsetX;


        let y =
            event.clientY
            -
            paperRect.top
            -
            dragOffsetY;


        const halfWidth =
            imageRect.width / 2;


        const halfHeight =
            imageRect.height / 2;


        x =
            Math.max(
                halfWidth,
                Math.min(
                    x,
                    paperRect.width
                    -
                    halfWidth
                )
            );


        y =
            Math.max(
                halfHeight,
                Math.min(
                    y,
                    paperRect.height
                    -
                    halfHeight
                )
            );


        previewImage.style.left =
            x + "px";


        previewImage.style.top =
            y + "px";

    }
);


previewImage.addEventListener(
    "pointerup",
    function (event) {

        if (!dragging) {
            return;
        }


        dragging =
            false;


        const trashRect =
            trashZone
                .getBoundingClientRect();


        const droppedOnTrash =

            trashZone.classList.contains(
                "show"
            )

            &&

            event.clientX >=
            trashRect.left

            &&

            event.clientX <=
            trashRect.right

            &&

            event.clientY >=
            trashRect.top

            &&

            event.clientY <=
            trashRect.bottom;


        if (
            droppedOnTrash
        ) {

            removeImage();

        }


        trashZone.classList.remove(
            "show",
            "active"
        );


        previewImage.style.cursor =
            "grab";


        try {

            previewImage.releasePointerCapture(
                event.pointerId
            );

        }

        catch (error) {
        }

    }
);


previewImage.addEventListener(
    "pointercancel",
    function () {

        dragging =
            false;


        trashZone.classList.remove(
            "show",
            "active"
        );

    }
);


/* ==================================================
   카드 다시 선택
================================================== */

document
    .getElementById(
        "selectBackBtn"
    )
    .addEventListener(
        "click",
        function () {

            showPage(
                selectPage
            );

        }
    );


/* ==================================================
   초기화
================================================== */

function resetCard() {

    cardText.value =
        "";


    previewText.textContent =
        "전하고 싶은 마음을 작성해주세요 💕";


    previewText.classList.add(
        "placeholder-text"
    );


    previewText.style.fontFamily =
        "'Pretendard', sans-serif";


    fontRadios.forEach(
        function (radio) {

            radio.checked =
                radio.value === "default";

        }
    );


    removeImage();


    document
        .querySelectorAll(
            'input[name="paperStyle"]'
        )
        .forEach(
            function (radio) {

                radio.checked =
                    radio.value === "plain";

            }
        );


    paperSheet.classList.remove(
        ...paperClasses
    );


    paperSheet.classList.add(
        "paper-plain"
    );


    cardPreview.style.background =
        "linear-gradient(135deg,#fff5da,#f3ddaa)";


    document
        .getElementById(
            "finalCardContainer"
        )
        .innerHTML =
        "";
}


/* ==================================================
   처음으로
================================================== */

document
    .getElementById(
        "introBackBtn"
    )
    .addEventListener(
        "click",
        function () {

            resetCard();


            showPage(
                introPage
            );


            playIntroAnimation();

        }
    );


/* ==================================================
   카드 완성
================================================== */

const finalCardContainer =
    document.getElementById(
        "finalCardContainer"
    );


document
    .getElementById(
        "finishBtn"
    )
    .addEventListener(
        "click",
        function () {

            const completedCard =
                cardPreview.cloneNode(
                    true
                );


            const copiedTrash =
                completedCard
                    .querySelector(
                        ".trash-zone"
                    );


            if (
                copiedTrash
            ) {

                copiedTrash.remove();

            }


            completedCard
                .querySelectorAll(
                    "[id]"
                )
                .forEach(
                    function (element) {

                        element.removeAttribute(
                            "id"
                        );

                    }
                );


            completedCard.removeAttribute(
                "id"
            );


            const completedImage =
                completedCard
                    .querySelector(
                        ".preview-image"
                    );


            if (
                completedImage
                &&
                !completedImage.getAttribute(
                    "src"
                )
            ) {

                completedImage.remove();

            }


            finalCardContainer.innerHTML =
                "";


            finalCardContainer.appendChild(
                completedCard
            );


            showPage(
                completePage
            );

        }
    );


/* ==================================================
   다시 수정
================================================== */

document
    .getElementById(
        "editAgainBtn"
    )
    .addEventListener(
        "click",
        function () {

            showPage(
                editorPage
            );

        }
    );


/* ==================================================
   새 카드
================================================== */

document
    .getElementById(
        "newCardBtn"
    )
    .addEventListener(
        "click",
        function () {

            resetCard();


            showPage(
                selectPage
            );

        }
    );