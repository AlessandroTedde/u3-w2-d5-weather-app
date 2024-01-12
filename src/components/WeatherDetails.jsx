import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const WeatherDetails = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  const fetchCity = async () => {
    const endpoint = `https://api.openweathermap.org/data/2.5/${params.locationId}`;
    try {
      const resp = await fetch(endpoint);
      if (resp.ok) {
        const response = await resp.json();
        console.log(response);
        setData(response);
        // this.setState({ isLoaded: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCity();
  }, [params]);

  return (
    <Container className="justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>{data.sys.country}</Card.Text>
          <Card.Text>{data.main.temp}</Card.Text>
          <Card.Text>{data.weather.description}</Card.Text>
          <Card.Text>{data.wind.speed}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WeatherDetails;
