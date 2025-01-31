import HomeContent from "./pages/HomeContent";

const Content = ({ selectedLink, selectedQuery }) => {
  //   console.log(selectedLink);
  //   console.log(selectedQuery);

  if (selectedLink.href === "menu") {
    return (
      <HomeContent selectedLink={selectedLink} selectedQuery={selectedQuery} />
    );
  }

  //   switch (selectedLink.href) {
  //     case "menu":
  //       return <div>Menu Content for {selectedLink.name}</div>;
  //     case "home":
  //       return <div>Home Content for {selectedLink.name}</div>;
  //     case "pie":
  //       return <div>Pie Chart Content for {selectedLink.name}</div>;
  //     case "bar":
  //       return <div>Bar Chart Content for {selectedLink.name}</div>;
  //     case "gis":
  //       return <div>GIS Content for {selectedLink.name}</div>;
  //     case "regmun":
  //       return <div>Regmun Content for {selectedLink.name}</div>;
  //     default:
  //       return <div>Select a link to see content</div>;
  //   }
};

export default Content;
