"use strict";

const billInput = document.querySelector("#bill-input");
const btnCustom = document.querySelector(".btn-custom");
const numberOfPeopleInput = document.querySelector("#number-of-people-input");
const tipAmountpay = document.querySelector(".tip-amount");
const totalPay = document.querySelector(".total-pay");
const btnReset = document.querySelector(".btn-reset");
const percent = document.querySelectorAll(".percent");

btnReset.addEventListener("click", (event) => {
  // Reset the input and values
  billInput.value = "";
  btnCustom.value = "";
  numberOfPeopleInput.value = "1";
  tipAmountpay.innerHTML = "$0.00";
  totalPay.innerHTML = "$0.00";

  // Reset the percentage btns
  percent.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });

  // Set 15% as the tip percentage
  percent[2].classList.add("active");
});

// Make the pecentage btns clickable
percent.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    percent.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    if (event.target.classList.contains("btn-custom")) {
      event.target.parentElement.classList.add("active");
    } else {
      event.target.classList.add("active");
    }
    calculateTip();
  });
});

const calculateTip = () => {
  const billValue = parseFloat(billInput.value);
  const numberOfPeople = parseFloat(numberOfPeopleInput.value);
  const customTipActive = document.querySelector(".tip-custom.active");
  let tipPercentage = parseInt(
    document.querySelector(".percent.active").dataset.percentage
  );

  if (customTipActive) {
    tipPercentage = parseFloat(document.querySelector(".btn-custom").value);
  }

  const totalAmount = parseFloat((tipPercentage / 100) * billValue).toFixed(2);
  const tipAmount = parseFloat(totalAmount / numberOfPeople).toFixed(2);
  const actualTotalAmount = parseFloat(
    (billValue + parseFloat(totalAmount)) / numberOfPeople
  ).toFixed(2);

  tipAmountpay.innerHTML = `$${tipAmount}`;
  totalPay.innerHTML = `$${actualTotalAmount}`;
};

billInput.addEventListener("keyup", (event) => {});
btnCustom.addEventListener("keyup", (event) => {});
numberOfPeopleInput.addEventListener("keyup", (event) => {});

const isNumber = (value) => {
  // Allow Exceptions
  if (
    value === "Backspace" ||
    value === "ArrowLeft" ||
    value === "ArrowRight" ||
    value === "."
  ) {
    return true;
  }

  const regex = /^[0-9]+$/;

  return regex.test(value);
};

// Calculate the tip
billInput.addEventListener("keyup", (event) => {
  calculateTip();
});
btnCustom.addEventListener("keyup", (event) => {
  calculateTip();
});
numberOfPeopleInput.addEventListener("keyup", (event) => {
  calculateTip();
});

// Prevent alphabetical characters from being entered
billInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
btnCustom.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
numberOfPeopleInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
