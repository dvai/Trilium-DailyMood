/*!
 * Trilium-DailyMood v1.0
 * https://github.com/dvai/Trilium-DailyMood
 *
 * Licensed Apache-2.0 © 东东
 */
function addTodayMood() {
    setTimeout(async () => {
        const emojis = ["😡", "👽", "😞", "😕", "😐", "🙂", "😊", "😄", "😆", "🥰", "🤩"];
        var calendar = $(document).find('.calendar-body');
        var dates = calendar.find('.calendar-date');

        await dates.each(async function () {
            var targetDate = $(this);
            var dayNoteDate = targetDate.attr("data-calendar-date");
            if (!targetDate.attr("href")) {
                return;
            };
            const dayNote = await api.getDayNote(dayNoteDate);
            var todayMood = dayNote.getLabelValue("todayMood");
            if (todayMood === null || todayMood === "") {
                return;
            }
            todayMood = parseInt(todayMood)
            var childElement = targetDate.find('span');
            targetDate.html(
                `<div style="position: relative;width:100%"><div style="text-align:center">${childElement.html()}</div >
            <div style="font-size:12px;position: absolute; top: 0; right: 0;">${emojis[todayMood]}</div>
    </div > `);
        });

    }, 90)
}
$(document).ready(function () {
    $('.bx-calendar').on('click', addTodayMood);
    $('.calendar-btn').on('click', addTodayMood);
})