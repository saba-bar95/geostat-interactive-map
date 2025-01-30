const queries = [
  {
    title: "ბიზნეს სტატისტიკა",
    links: function () {
      return [
        {
          href: "menu",
          name: this.title,
        },
        {
          href: "home",
          name: "მაჩვენებელი",
        },
        {
          href: "pie",
          name: "დიაგრამა",
        },
        {
          href: "bar",
          name: "ჰისტოგრამა",
        },
        {
          href: "gis",
          name: "მოძებნე ბიზნეს სუბიექტი",
        },
      ];
    },
  },
  {
    title: "მოსახლეობის 2014 წლის საყოველთაო აღწერა",
    links: function () {
      return [
        {
          href: "menu",
          name: this.title,
        },
        {
          href: "regmun",
          name: "ფენა",
        },
        {
          href: "home",
          name: "მაჩვენებელი",
        },
        {
          href: "bar",
          name: "ჰისტოგრამა",
        },
      ];
    },
  },
  {
    title: "სასოფლო-სამეურნეო აღწერა 2014",
    links: function () {
      return [
        {
          href: "menu",
          name: this.title,
        },
        {
          href: "regmun",
          name: "ფენა",
        },
        {
          href: "home",
          name: "მაჩვენებელი",
        },
        {
          href: "bar",
          name: "ჰისტოგრამა",
        },
      ];
    },
  },
  {
    title: "ფასების სტატისტიკა",
    links: function () {
      return [
        {
          href: "menu",
          name: this.title,
        },
        {
          href: "home",
          name: "მაჩვენებელი",
        },
        {
          href: "pie",
          name: "დიაგრამა",
        },
        {
          href: "bar",
          name: "ჰისტოგრამა",
        },
      ];
    },
  },
];

queries.forEach((el) => {
  el.links = el.links.bind(el)();
});

export default queries;
