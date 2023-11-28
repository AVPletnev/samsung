// Initialize Swiper

const swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
const swiper2 = new Swiper(".mySwiper2", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  thumbs: {
    swiper: swiper,
  },
  breakpoints: {
    768: {
      pagination: false,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});

// Tabs

const tabLabels = document.querySelectorAll("#tabs li");
const tabPanes = document.getElementsByClassName("tab-contents");

function activateTab(e) {
  e.preventDefault();

  // Deactivate all tabs
  tabLabels.forEach(function (label, index) {
    label.classList.remove("active");
  });
  [].forEach.call(tabPanes, function (pane, index) {
    pane.classList.remove("active");
  });

  // Activate current tab
  e.target.parentNode.classList.add("active");
  var clickedTab = e.target.getAttribute("href");
  document.querySelector(clickedTab).classList.add("active");
}

// Apply event listeners
tabLabels.forEach(function (label, index) {
  label.addEventListener("click", activateTab);
});

// spoiler block

$(document).on("click", ".option-spoiler-button", function (e) {
  e.preventDefault();
  $(this).hide();
  $(this).parent().children(".option-spoiler").toggle();
});

$(document).on("click", ".close-spoiler", function (e) {
  e.preventDefault();
  $(this).parent(".option-spoiler").toggle();
  $(this).parent(".option-spoiler").prev().show();
});

const moreInfoButton = $(".js-more-info");

moreInfoButton.click(function () {
  $("html, body").animate(
    {
      scrollTop: $(".js-faq").offset().top, // класс объекта к которому приезжаем
    },
    1000
  );
});

const step1 = $(".step1");
const step2 = $(".step2");
const step3 = $(".step3");
const step4 = $(".step4");
const calculate = $(".calculate");
const startBtn = $(".js-start-btn");

step1.hide();
step2.hide();
step3.hide();
step4.hide();

calculate.hide();

startBtn.click(function () {
  step1.show();
  $(this).text("Оформить");

  $("html, body").animate(
    {
      scrollTop: $(".step1").offset().top,
    },
    1000
  );

  dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      items: [
        {
          item_name: "Galaxy A5 6/128Гб, графит, dual Sim",
          item_id: "3161",
          price: 24000,
          item_brand: "Samsung",
          item_category: "Смартфоны",
          quantity: 1,
        },
      ],
    },
  });
});

$(document).on("click", ".option", function (e) {
  step2.show();

  dataLayer.push({
    event: "select_program",
    content: $(this).children(".option-header").text(), // переменная, если заселекчено без, то передаем значение without
  });
});

$(document).on("click", ".accessory", function (e) {
  step3.show();
  $("#accessory4").prop("checked", false);

  dataLayer.push({
    event: "select_accessories",
    content: $(this).prev().attr("data-accessory"),
  });
});

const noaccessory = $(".noaccessory");

noaccessory.click(function () {
  $("#accessory1").prop("checked", false);
  $("#accessory2").prop("checked", false);
  $("#accessory3").prop("checked", false);
});

$(document).on("click", ".mobile-item", function (e) {
  step4.show();

  dataLayer.push({
    event: "select_sim",
    content: $(this).prev().attr("data-tarif"),
  });
});

$(document).on("click", ".condition", function (e) {
  calculate.show();

  dataLayer.push({
    event: "select_app_pack",
    content: $(this).prev().attr("data-condition"),
  });
});

$(document).on("click", ".finish-button", function (e) {
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "purchase",
    content_program: "name_of_program",
    content_access: accessoriesName.textContent,
    content_sim: mobileName.textContent,
    content_app_pack: conditionName.textContent,
    ecommerce: {
      transaction_id: "177758",
      affiliation: "Online Store",
      value: "24000.",
      shipping: "0",
      currency: "RUB",
      items: [
        {
          item_name: "Galaxy A5 6/128Гб, графит, dual Sim",
          item_id: "3161",
          price: 24000,
          item_brand: "Samsung",
          item_category: "Смартфоны",
          quantity: 1,
        },
      ],
    },
  });
});

/****** options */

const optionsPrice = document.querySelector(".js-options-price");

const options = document.querySelectorAll(".input-option");
const accessories = document.querySelectorAll(".input-accessory");
const mobile = document.querySelectorAll(".input-mobile");
const conditions = document.querySelectorAll(".input-condition");

const accessoriesItems = document.querySelector(".finish-item__wrapper");
const accessoriesPrice = document.querySelector(".js-accessories-price");
const accessoriesName = document.querySelector(".js-accessories-name");

const mobilePrice = document.querySelector(".js-mob-tarif-price");
const mobileName = document.querySelector(".js-mob-tarif-name");

const conditionPrice = document.querySelector(".js-condition-price");
const conditionName = document.querySelector(".js-condition-name");

const insurancePrice = document.querySelector(".js-insurance-price");
const insuranceName = document.querySelector(".js-insurance-name");

const nowPrice = document.querySelector(".js-now-price");
const afterYearPrice = document.querySelector(".js-after-year-price");
const monthPrice = document.querySelector(".js-month-price");

const price = 40105;

options.forEach((item) => {
  item.addEventListener("click", () => {
    resultOptionPrice(item);
    calcNowPrice(item);
    calcMonthPrice(options);
  });
});

const resultOptionPrice = (item) => {
  if (item.value === "1233") {
    optionsPrice.innerText = 0 + " ₽";
    insurancePrice.innerText = 535 + " ₽";
    insuranceName.innerText = "Страховка смартфона";
  } else if (item.value === "20105") {
    optionsPrice.innerText = 24063 + " ₽";
    insurancePrice.innerText = "";
    insuranceName.innerText = "";
  } else {
    optionsPrice.innerText = 24063 + " ₽";
    insurancePrice.innerText = 268 + " ₽";
    insuranceName.innerText = "Страховка смартфона";
  }
};

/****** accessories */

accessories.forEach((item) => {
  item.addEventListener("click", () => {
    resultAccessoriesPrice(item);
    calcMonthPrice(accessories);
  });
});

const resultAccessoriesPrice = (item) => {
  accessoriesPrice.innerText = item.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽/мес";
  accessoriesName.innerText = item.getAttribute("data-accessory");
};


/****** mobile */

mobile.forEach((item) => {
  item.addEventListener("click", () => {
    resultMobilePrice(item);
    calcMonthPrice(mobile);
  });
});

const resultMobilePrice = (item) => {
  mobilePrice.innerText = item.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽/мес";
  mobileName.innerText = item.getAttribute("data-tarif");
};

/****** conditions */

conditions.forEach((item) => {
  item.addEventListener("click", () => {
    resultConditionPrice(item);
    calcMonthPrice(conditions);
  });
});

const resultConditionPrice = (item) => {
  conditionPrice.innerText = item.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽/мес";
  conditionName.innerText = item.getAttribute("data-condition");
};

/****** nowPrice */

const calcNowPrice = (item) => {
  if (item.value === "14790") {
    nowPrice.innerText = (price * 0.6).toFixed() + " ₽";
    afterYearPrice.innerText = (price * 0.4).toFixed() + " ₽";
  }
  if (item.value === "17255") {
    nowPrice.innerText = (price * 0.7).toFixed() + " ₽";
    afterYearPrice.innerText = (price * 0.3).toFixed() + " ₽";
  }
  if (item.value === "1233") {
    nowPrice.innerText = 0 + " ₽";
    afterYearPrice.innerText = (price * 0.4).toFixed() + " ₽";
  }
  if (item.value === "20105") {
    nowPrice.innerText = 0 + " ₽";
  }
};

let selectOption;
let selectMobile;
let selectAccessories;
let selectConditions;
let insuranceLow = 268;
let insurancehigh = 535;

const calcMonthPrice = (items) => {
  options.forEach((el) => {
    if (el.checked) {
      selectOption = el.value;
    }
  });

  accessories.forEach((el) => {
    if (el.checked) {
      selectAccessories = el.value;
      console.log("accessory", selectAccessories);
    }
  });

  mobile.forEach((el) => {
    if (el.checked) {
      selectMobile = el.value;
      console.log("mobile", selectMobile);
    }
  });

  conditions.forEach((el) => {
    if (el.checked) {
      selectConditions = el.value;
      console.log("conditions", selectConditions);
    }
  });

  if (selectOption == "14790") {
    nowPrice.innerText = (price * 0.6).toFixed(0) + " ₽";
    monthPrice.innerHTML =
      ((price * 0.08) / 12 + Number(selectAccessories) + Number(selectMobile) + Number(selectConditions)).toFixed() +
      " ₽";
  }

  if (selectOption == "17255") {
    nowPrice.innerText = (price * 0.7).toFixed(0) + " ₽";
    monthPrice.innerHTML =
      (
        (price * 0.08) / 12 +
        Number(selectAccessories) +
        Number(selectMobile) +
        Number(selectConditions) / 2
      ).toFixed() + " ₽";
  }

  if (selectOption == "1233") {
    nowPrice.innerText = 0 + " ₽";

    monthPrice.innerHTML =
      (
        (price * 0.6 + price * 0.16 + Number(selectAccessories) + Number(selectMobile) + Number(selectConditions)) /
        12
      ).toFixed(0) + " ₽";
  }

  if (selectOption == "20105") {
    nowPrice.innerText =
      Number(selectOption) + Number(selectMobile) + Number(selectAccessories) + Number(selectConditions) + " ₽";

    monthPrice.innerHTML = 0 + " ₽";
  }
};
// const mobTarifPrice = document.querySelector(".js-mob-tarif-price");
// const mobTarifName = document.querySelector(".js-mob-tarif-name");
// const conditionPrice = document.querySelector(".js-condition-price");
// const conditionName = document.querySelector(".js-condition-name");
// const nowPrice = document.querySelector(".js-now-price");
// const monthPrice = document.querySelector(".js-month-price");
