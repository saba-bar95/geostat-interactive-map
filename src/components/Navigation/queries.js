const queries = [
  {
    path: "business-statistics",
    title_ge: "ბიზნეს სტატისტიკა",
    title_en: "Business Statistics",
    links: function () {
      return [
        {
          href: "menu",
          name_ge: this.title_ge,
          name_en: this.title_en,
        },
        {
          href: "home",
          name_ge: "მაჩვენებელი",
          name_en: "Indicator",
        },
        {
          href: "pie",
          name_ge: "დიაგრამა",
          name_en: "Diagram",
        },
        {
          href: "bar",
          name_ge: "ჰისტოგრამა",
          name_en: "Histogram",
        },
        {
          href: "gis",
          name_ge: "მოძებნე ბიზნეს სუბიექტი",
          name_en: "Find business entity",
        },
      ];
    },
  },

  {
    path: "consumer-price-index",
    title_ge: "ფასების სტატისტიკა",
    title_en: "Consumer Price Index",
    links: function () {
      return [
        {
          href: "menu",
          name_ge: this.title_ge,
          name_en: this.title_en,
        },
        {
          href: "home",
          name_ge: "მაჩვენებელი",
          name_en: "Indicator",
        },
        {
          href: "pie",
          name_ge: "დიაგრამა",
          name_en: "Diagram",
        },
        {
          href: "bar",
          name_ge: "ჰისტოგრამა",
          name_en: "Histogram",
        },
      ];
    },
  },
];

queries.forEach((el) => {
  el.links = el.links.bind(el)();
});

export default queries;
