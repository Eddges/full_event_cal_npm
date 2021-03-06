interface EventObjectInterface {
    [key: string]: string;
}

const fullCalendar = (events: { [key: string]: EventObjectInterface } | null, styles: { [key: string]: string } | null) => {
    const dayArray: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const eventsArray: { [key: string]: EventObjectInterface } = {};
    if (events) {
        Object.keys(events).forEach((iterator) => {
            const newKey: string = new Date(iterator).toDateString();
            eventsArray[newKey] = events[iterator];
        });
    }

    const head = document.getElementsByTagName("HEAD")[0];
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "./styles/mainFull.css";

    head.appendChild(link);

    const containerDiv = document.querySelector(".full-calendar");

    if (containerDiv) {
        containerDiv.innerHTML = `
            <div class="Top">
                <span id="prevMonth">&lt;</span>
                <div class="DivCurrent">
                    <span class="MonthName"></span>
                    <span class="CurrentDate"></span>
                </div>

                <span id="nextMonth">&gt;</span>
            </div>
            <div class="Labels">
                <span class="Label">Sun</span>
                <span class="Label">Mon</span>
                <span class="Label">Tue</span>
                <span class="Label">Wed</span>
                <span class="Label">Thu</span>
                <span class="Label">Fri</span>
                <span class="Label">Sat</span>
            </div>
            <div class="Dates"></div>
            `;
    }

    const renderCalendar: (
        contextMonth: number,
        contextYear: number
    ) => void = (contextMonth, contextYear) => {
        const monthNameElement = document.querySelector(".MonthName");
        const currentDateElement = document.querySelector(".CurrentDate");
        const datesElement = document.querySelector(".Dates");

        console.log("ContainerDiv: ", containerDiv);

        const contextDate: Date = new Date();

        contextDate.setMonth(contextMonth);
        contextDate.setFullYear(contextYear);

        const firstDayOfThisMonth: Date = new Date(
            contextYear,
            contextDate.getMonth(),
            1
        );
        const lastDayOfThisMonth: Date = new Date(
            contextYear,
            contextDate.getMonth() + 1,
            0
        );

        const startDayOfCurrentMonth: number = firstDayOfThisMonth.getDay();
        const lastDateOfPrevMonth: number = new Date(
            2021,
            contextDate.getMonth(),
            0
        ).getDate();

        if (monthNameElement) {
            monthNameElement.innerHTML =
                dayArray[contextMonth] + ` ${contextYear}`;
        }
        if (currentDateElement) {
            currentDateElement.innerHTML = new Date().toDateString();
        }

        if (datesElement) {
            datesElement.innerHTML = "";
            for (
                let i = lastDateOfPrevMonth - startDayOfCurrentMonth + 1;
                i <= lastDateOfPrevMonth;
                i++
            ) {
                datesElement.innerHTML += `<div class='Date PrevDate'>${i}</div>`;
            }
            for (let i = 1; i <= lastDayOfThisMonth.getDate(); i++) {
                let eventsFlag = false;
                const today = new Date(contextYear, contextMonth, i);
                const todayString = today.toDateString();
                const numberSpan = `<span class='Number'>${i}</span>`;

                let redEvent: string = "";
                let greenEvent: string = "";
                let blueEvent: string = "";

                if (eventsArray[todayString]) {
                    console.log("Matched");
                    eventsFlag = true;
                    if (eventsArray[todayString].red) {
                        redEvent = `<span class='EventsElement Red'></span><span class='Hover NoDisplay'>${eventsArray[todayString].red}</span>`;
                    }
                    if (eventsArray[todayString].blue) {
                        greenEvent = `<span class='EventsElement Blue'></span><span class='Hover NoDisplay'>${eventsArray[todayString].blue}</span>`;
                    }
                    if (eventsArray[todayString].green) {
                        blueEvent = `<span class='EventsElement Green'></span><span class='Hover NoDisplay'>${eventsArray[todayString].green}</span>`;
                    }
                }
                // eventsArray

                const eventsDiv = `<div class='Events'>${
                    redEvent ? redEvent : ""
                }${greenEvent ? greenEvent : ""}${
                    blueEvent ? blueEvent : ""
                }</div>`;
                datesElement.innerHTML += `<div class='Date ${
                    i === new Date().getDate() &&
                    new Date().getMonth() === contextMonth &&
                    new Date().getFullYear() === contextYear
                        ? "Active"
                        : ""
                }'>${numberSpan}${eventsFlag ? eventsDiv : ""}</div>`;
            }
            for (let i = 1; i <= 7 - lastDayOfThisMonth.getDay() - 1; i++) {
                datesElement.innerHTML += `<div class='Date NextDate'>${i}</div>`;
            }
        }

        document.querySelectorAll(".EventsElement").forEach((item) => {
            item.addEventListener("mouseenter", () => {
                item.nextElementSibling?.classList.remove("NoDisplay");
            });
        });
        document.querySelectorAll(".EventsElement").forEach((item) => {
            item.addEventListener("mouseout", () => {
                item.nextElementSibling?.classList.add("NoDisplay");
            });
        });
    };

    let monthCounter = new Date().getMonth();
    let yearCounter = new Date().getFullYear();

    renderCalendar(monthCounter, yearCounter);

    const prevMonthChevron = document.querySelector("#prevMonth");
    const nextMonthChevron = document.querySelector("#nextMonth");

    if (prevMonthChevron) {
        prevMonthChevron.addEventListener("click", () => {
            monthCounter--;
            if (monthCounter < 0) {
                yearCounter--;
                monthCounter = 11;
            }
            renderCalendar(monthCounter, yearCounter);
        });
    }

    if (nextMonthChevron) {
        nextMonthChevron.addEventListener("click", () => {
            monthCounter++;
            if (monthCounter > 11) {
                yearCounter++;
                monthCounter = 0;
            }
            renderCalendar(monthCounter, yearCounter);
        });
    }
};


export = fullCalendar