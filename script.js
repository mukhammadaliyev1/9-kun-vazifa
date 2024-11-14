document.addEventListener("DOMContentLoaded", function () {
  const liftElement = document.querySelector(".lift-floor");
  const liftPositionText = document.getElementById("lift-position");
  const buttons = document.querySelectorAll(".floor-btn");

  let currentFloor = 1;
  let isMoving = false;
  let floorQueue = [];
  function moveLift() {
    if (isMoving || floorQueue.length === 0) return;

    const targetFloor = floorQueue.shift();
    const distance = Math.abs(targetFloor - currentFloor) * 96;
    isMoving = true;

    liftElement.style.transition = "transform 3s linear";
    liftElement.style.transform = `translateY(-${(targetFloor - 1) * 96}px)`;

    setTimeout(() => {
      currentFloor = targetFloor;
      liftPositionText.textContent = currentFloor;
      isMoving = false;
      moveLift();
    }, 3000);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetFloor = parseInt(button.getAttribute("data-floor"));
      if (!floorQueue.includes(targetFloor) && targetFloor !== currentFloor) {
        floorQueue.push(targetFloor);
        moveLift();
      }
    });
  });
});
