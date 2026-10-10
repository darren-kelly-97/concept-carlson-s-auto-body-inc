document.documentElement.classList.add("js");

const filterGroup = document.querySelector("[data-repair-filters]");

if (filterGroup) {
  const buttons = Array.from(filterGroup.querySelectorAll("[data-filter]"));
  const services = Array.from(document.querySelectorAll("[data-service-item]"));
  const count = document.querySelector("[data-filter-count]");
  const empty = document.querySelector("[data-filter-empty]");

  if (buttons.length && services.length) {
    filterGroup.hidden = false;

    function applyFilter(category) {
      let visible = 0;

      services.forEach((service) => {
        const categories = (service.dataset.category || "").split(/\s+/);
        const matches = category === "all" || categories.includes(category);
        service.hidden = !matches;

        if (matches) visible += 1;
      });

      buttons.forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.filter === category)
        );
      });

      if (count) {
        count.textContent = `${visible} ${visible === 1 ? "service" : "services"}`;
      }

      if (empty) {
        empty.hidden = visible !== 0;
      }
    }

    filterGroup.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");

      if (button && filterGroup.contains(button)) {
        applyFilter(button.dataset.filter);
      }
    });

    const initial =
      buttons.find((button) => button.getAttribute("aria-pressed") === "true") ||
      buttons[0];

    applyFilter(initial.dataset.filter);
  }
}