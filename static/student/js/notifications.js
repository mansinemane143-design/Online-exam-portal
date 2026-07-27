const notifications = document.querySelectorAll(".notification");

notifications.forEach(notification => {

    notification.addEventListener("click", () => {

        notification.classList.add("read");

        const dot = notification.querySelector(".dot");

        if(dot){
            dot.remove();
        }

    });

});