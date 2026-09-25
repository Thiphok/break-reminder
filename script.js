// =========================================
// BREAK REMINDER
// =========================================

// true = ใช้สำหรับทดลอง
// false = ใช้เวลาจริงจาก Work Mode
const TEST_MODE = true;

const TEST_WORK_SECONDS = 20;
const TEST_BREAK_SECONDS = 30;


// Default mode = Gentle Focus
let WORK_TIME = 25 * 60;
let BREAK_TIME = 5 * 60;

let timeLeft = 0;

let timer = null;

let running = false;

let mode = "work";

let sessionCount = 0;


// =========================================
// DOM
// =========================================

const timerElement =
    document.getElementById("timer");

const mainButton =
    document.getElementById("mainButton");

const statusText =
    document.getElementById("statusText");

const sessionStatus =
    document.getElementById("sessionStatus");

const sessionCountElement =
    document.getElementById("sessionCount");

const modeLabel =
    document.getElementById("modeLabel");

const description =
    document.getElementById("description");

const breakDuration =
    document.getElementById("breakDuration");


// Mode selector

const modeSelect =
    document.getElementById("modeSelect");

const customSettings =
    document.getElementById("customSettings");

const customWork =
    document.getElementById("customWork");

const customBreak =
    document.getElementById("customBreak");

const applyCustom =
    document.getElementById("applyCustom");


// Break notification

const breakNudge =
    document.getElementById("breakNudge");

const breathingBtn =
    document.getElementById("breathingBtn");

const laterBtn =
    document.getElementById("laterBtn");


// Break overlay

const breakOverlay =
    document.getElementById("breakOverlay");

const restChoice =
    document.getElementById("restChoice");

const breathingChoice =
    document.getElementById("breathingChoice");

const breathingGuide =
    document.getElementById("breathingGuide");

const openBreathing =
    document.getElementById("openBreathing");

const backToRest =
    document.getElementById("backToRest");

const finishBreathing =
    document.getElementById("finishBreathing");


// Breathing guide

const breathingPatternName =
    document.getElementById("breathingPatternName");

const breathingInstruction =
    document.getElementById("breathingInstruction");

const breathOrb =
    document.getElementById("breathOrb");

const breathingPhase =
    document.getElementById("breathingPhase");

const breathingHint =
    document.getElementById("breathingHint");

const breathingCycle =
    document.getElementById("breathingCycle");

const breathingRemaining =
    document.getElementById("breathingRemaining");


// =========================================
// BREATHING PATTERNS
// =========================================

const breathingPatterns = {

    natural: {

        name: "Natural Breathing",

        phases: [
            {
                label: "หายใจเข้าอย่างสบาย",
                hint: "ไม่ต้องฝืน แค่หายใจตามสบาย",
                seconds: 4,
                type: "inhale"
            },
            {
                label: "หายใจออกอย่างสบาย",
                hint: "ผ่อนลมหายใจออกตามธรรมชาติ",
                seconds: 4,
                type: "exhale"
            }

        ]

    },


    equal: {

        name: "Equal Breathing",

        phases: [
            {
                label: "หายใจเข้า",
                hint: "ค่อย ๆ หายใจเข้า",
                seconds: 4,
                type: "inhale"
            },
            {
                label: "หายใจออก",
                hint: "ค่อย ๆ ผ่อนลมหายใจออก",
                seconds: 4,
                type: "exhale"
            }

        ]

    },


    extended: {

        name: "Extended Exhale",

        phases: [

            {
                label: "หายใจเข้า",
                hint: "ค่อย ๆ หายใจเข้า",
                seconds: 4,
                type: "inhale"
            },

            {
                label: "หายใจออก",
                hint: "ปล่อยลมหายใจออกให้นานขึ้น",
                seconds: 6,
                type: "exhale"
            }

        ]

    },


    coherent: {

        name: "Coherent Breathing",

        phases: [

            {
                label: "หายใจเข้า",
                hint: "หายใจเข้าอย่างสม่ำเสมอ",
                seconds: 5,
                type: "inhale"
            },

            {
                label: "หายใจออก",
                hint: "หายใจออกอย่างสม่ำเสมอ",
                seconds: 5,
                type: "exhale"
            }

        ]

    },


    box: {

        name: "Box Breathing",

        phases: [

            {
                label: "หายใจเข้า",
                hint: "ค่อย ๆ หายใจเข้า",
                seconds: 4,
                type: "inhale"
            },

            {
                label: "กลั้นลมหายใจ",
                hint: "อยู่นิ่ง ๆ ชั่วครู่",
                seconds: 4,
                type: "hold"
            },

            {
                label: "หายใจออก",
                hint: "ค่อย ๆ ผ่อนลมหายใจออก",
                seconds: 4,
                type: "exhale"
            },

            {
                label: "กลั้นลมหายใจ",
                hint: "พักนิ่ง ๆ ก่อนเริ่มรอบใหม่",
                seconds: 4,
                type: "hold"
            }

        ]

    },


    sigh: {

        name: "Physiological Sigh",

        phases: [

            {
                label: "หายใจเข้า",
                hint: "หายใจเข้า",
                seconds: 2,
                type: "inhale"
            },

            {
                label: "หายใจเข้าเพิ่มอีกเล็กน้อย",
                hint: "เติมลมหายใจอีกครั้ง",
                seconds: 1,
                type: "inhale"
            },

            {
                label: "ผ่อนลมหายใจออก",
                hint: "ผ่อนออกยาว ๆ",
                seconds: 6,
                type: "exhale"
            }

        ]

    },


    energizing: {

        name: "Energizing Breath",

        phases: [

            {
                label: "หายใจเข้า",
                hint: "หายใจเข้าอย่างกระฉับกระเฉง",
                seconds: 4,
                type: "inhale"
            },

            {
                label: "หายใจออก",
                hint: "ผ่อนออกสั้นกว่า",
                seconds: 3,
                type: "exhale"
            }

        ]

    },


    longExhale: {

        name: "Long Exhale Rest",

        phases: [

            {
                label: "หายใจเข้า",
                hint: "หายใจเข้าอย่างช้า ๆ",
                seconds: 3,
                type: "inhale"
            },

            {
                label: "หายใจออก",
                hint: "ผ่อนลมหายใจออกให้ยาวขึ้น",
                seconds: 6,
                type: "exhale"
            }

        ]

    }

};


// =========================================
// FORMAT TIME
// =========================================

function formatTime(seconds) {

    seconds = Math.max(0, Math.floor(seconds));

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


// =========================================
// WORK TIMER
// =========================================

function updateWorkTimer() {

    timerElement.textContent =
        formatTime(timeLeft);

}


function startWork() {

    if (running) return;


    // ถ้ารอบก่อนจบแล้ว
    if (timeLeft <= 0) {

        timeLeft = WORK_TIME;

        updateWorkTimer();

    }


    running = true;

    mainButton.textContent =
        "หยุดชั่วคราว";

    statusText.textContent =
        "กำลังทำงาน";

    sessionStatus.textContent =
        "กำลังทำงาน";


    timer = setInterval(() => {

        timeLeft--;

        updateWorkTimer();


        if (timeLeft <= 0) {

            clearInterval(timer);

            timer = null;

            running = false;

            sessionCount++;

            sessionCountElement.textContent =
                sessionCount;

            showBreakNudge();

        }

    }, 1000);

}


function pauseWork() {

    if (!running) return;


    clearInterval(timer);

    timer = null;

    running = false;

    mainButton.textContent =
        "ทำงานต่อ";

    statusText.textContent =
        "หยุดชั่วคราว";

    sessionStatus.textContent =
        "หยุดชั่วคราว";

}


// =========================================
// SOFT BREAK NOTIFICATION
// =========================================

function showBreakNudge() {

    statusText.textContent =
        "ถึงเวลาพัก";

    sessionStatus.textContent =
        "ถึงเวลาพัก";

    mainButton.textContent =
        "เริ่มรอบใหม่";


    breakNudge.classList.add("active");


    sendSystemNotification();

}


function hideBreakNudge() {

    breakNudge.classList.remove("active");

}


function sendSystemNotification() {

    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification(
            "Break Reminder",
            {
                body:
                    "ถึงเวลาพักแล้ว ลองพักหายใจสักครู่"
            }
        );

    }

}


// Ask permission when starting work

async function requestNotificationPermission() {

    if (
        !("Notification" in window)
    ) {

        return;

    }


    if (
        Notification.permission === "default"
    ) {

        try {

            await Notification.requestPermission();

        } catch (error) {

            console.log(
                "Notification permission error:",
                error
            );

        }

    }

}


// =========================================
// BREAK TYPE
// =========================================

function openBreakExperience() {

    hideBreakNudge();

    breakOverlay.classList.add("active");

    restChoice.classList.remove("hidden");

    breathingChoice.classList.add("hidden");

    breathingGuide.classList.add("hidden");

}


openBreathing.addEventListener(
    "click",
    () => {

        restChoice.classList.add("hidden");

        breathingChoice.classList.remove("hidden");

    }
);


breathingBtn.addEventListener(
    "click",
    () => {

        openBreakExperience();

    }
);


laterBtn.addEventListener(
    "click",
    () => {

        hideBreakNudge();

        mode = "work";

        timeLeft = WORK_TIME;

        statusText.textContent =
            "พร้อมทำงาน";

        sessionStatus.textContent =
            "พร้อมเริ่ม";

        mainButton.textContent =
            "เริ่มทำงาน";

        updateWorkTimer();

    }
);


backToRest.addEventListener(
    "click",
    () => {

        breathingChoice.classList.add("hidden");

        restChoice.classList.remove("hidden");

    }
);


// =========================================
// BREATHING ENGINE
// =========================================

let activePattern = null;

let breathingInterval = null;

let breathingEndTime = 0;

let lastPhaseIndex = -1;


function getPatternDuration(pattern) {

    return pattern.phases.reduce(
        (total, phase) =>
            total + phase.seconds,
        0
    );

}


function startBreathing(patternKey) {

    const pattern =
        breathingPatterns[patternKey];


    if (!pattern) return;


    activePattern = pattern;


    restChoice.classList.add("hidden");

    breathingChoice.classList.add("hidden");

    breathingGuide.classList.remove("hidden");


    breathingPatternName.textContent =
        pattern.name.toUpperCase();


    breathingEndTime =
        Date.now() +
        BREAK_TIME * 1000;


    lastPhaseIndex = -1;


    clearInterval(breathingInterval);


    updateBreathing();


    breathingInterval =
        setInterval(
            updateBreathing,
            100
        );

}


function updateBreathing() {

    if (!activePattern) return;


    const now = Date.now();

    const remaining =
        Math.max(
            0,
            Math.ceil(
                (breathingEndTime - now) /
                1000
            )
        );


    breathingRemaining.textContent =
        "พักเหลือ " +
        formatTime(remaining);


    if (remaining <= 0) {

        finishBreak();

        return;

    }


    const cycleDuration =
        getPatternDuration(
            activePattern
        );


    const elapsed =
        Math.floor(
            (
                BREAK_TIME * 1000 -
                (breathingEndTime - now)
            ) / 1000
        );


    const cyclePosition =
        elapsed %
        cycleDuration;


    let currentPosition = 0;

    let currentPhase = null;

    let currentPhaseIndex = 0;


    for (
        let i = 0;
        i < activePattern.phases.length;
        i++
    ) {

        const phase =
            activePattern.phases[i];


        if (
            cyclePosition <
            currentPosition + phase.seconds
        ) {

            currentPhase =
                phase;

            currentPhaseIndex =
                i;

            break;

        }


        currentPosition +=
            phase.seconds;

    }


    if (!currentPhase) {

        currentPhase =
            activePattern.phases[
                activePattern.phases.length - 1
            ];

        currentPhaseIndex =
            activePattern.phases.length - 1;

    }


    const phaseElapsed =
        cyclePosition -
        currentPosition;


    const secondsLeft =
        Math.max(
            0,
            currentPhase.seconds -
            phaseElapsed
        );


    if (
        currentPhaseIndex !==
        lastPhaseIndex
    ) {

        lastPhaseIndex =
            currentPhaseIndex;


        breathingInstruction.textContent =
            currentPhase.label;


        breathingHint.textContent =
            currentPhase.hint;


        breathOrb.classList.remove(
            "inhale",
            "exhale",
            "hold"
        );


        breathOrb.classList.add(
            currentPhase.type
        );

    }


    breathingPhase.textContent =
        String(secondsLeft)
        .padStart(2, "0");


    const cycleNumber =
        Math.floor(
            elapsed /
            cycleDuration
        ) + 1;


    breathingCycle.textContent =
        "รอบที่ " +
        cycleNumber;

}


function finishBreak() {

    clearInterval(
        breathingInterval
    );

    breathingInterval = null;

    activePattern = null;

    breakOverlay.classList.remove(
        "active"
    );

    breathingChoice.classList.add(
        "hidden"
    );

    breathingGuide.classList.add(
        "hidden"
    );

    restChoice.classList.remove(
        "hidden"
    );


    mode = "work";

    timeLeft = WORK_TIME;


    statusText.textContent =
        "พักเสร็จแล้ว";

    sessionStatus.textContent =
        "พร้อมเริ่ม";


    mainButton.textContent =
        "เริ่มทำงาน";


    updateWorkTimer();

}


// Pattern buttons

document
    .querySelectorAll(".breathing-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const pattern =
                    button.dataset.pattern;

                startBreathing(pattern);

            }
        );

    });


finishBreathing.addEventListener(
    "click",
    () => {

        finishBreak();

    }
);


// =========================================
// MAIN BUTTON
// =========================================

mainButton.addEventListener(
    "click",
    async () => {

        await requestNotificationPermission();


        if (running) {

            pauseWork();

        } else {

            startWork();

        }

    }
);


// =========================================
// WORK MODES
// =========================================

function setMode(
    workMinutes,
    breakMinutes
) {

    // DEMO MODE
    if (TEST_MODE) {

        WORK_TIME =
            TEST_WORK_SECONDS;

        BREAK_TIME =
            TEST_BREAK_SECONDS;

    } else {

        WORK_TIME =
            workMinutes * 60;

        BREAK_TIME =
            breakMinutes * 60;

    }


    breakDuration.textContent =
        `${breakMinutes} นาที`;


    if (
        !running &&
        mode === "work"
    ) {

        timeLeft = WORK_TIME;

        updateWorkTimer();

    }

}


// Mode select

modeSelect.addEventListener(
    "change",
    () => {

        const selected =
            modeSelect.value;


        if (
            selected === "custom"
        ) {

            customSettings.classList.add(
                "active"
            );

            return;

        }


        customSettings.classList.remove(
            "active"
        );


        if (
            selected === "gentle"
        ) {

            setMode(25, 5);

        }


        if (
            selected === "balanced"
        ) {

            setMode(50, 10);

        }


        if (
            selected === "deep"
        ) {

            setMode(75, 15);

        }


        if (
            selected === "flow"
        ) {

            breakDuration.textContent =
                "ยืดหยุ่น";

        }

    }
);


applyCustom.addEventListener(
    "click",
    () => {

        const workMinutes =
            Number(customWork.value);

        const breakMinutes =
            Number(customBreak.value);


        if (
            !Number.isFinite(workMinutes) ||
            !Number.isFinite(breakMinutes) ||
            workMinutes < 1 ||
            breakMinutes < 1
        ) {

            alert(
                "กรุณากำหนดเวลาให้ถูกต้อง"
            );

            return;

        }


        setMode(
            workMinutes,
            breakMinutes
        );

    }
);


// =========================================
// INITIAL
// =========================================

setMode(25, 5);

timeLeft = WORK_TIME;

updateWorkTimer();