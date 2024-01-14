import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const WeatherDetails = () => {
  const [data, setData] = useState([]);
  const { lat, lon } = useParams();

  console.log(lat, lon);

  const fetchCity = async () => {
    console.log("sto fetchando le info");

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=44ec3e35b6cc604242ad14fd87fac22c`;
    try {
      const resp = await fetch(endpoint);
      if (resp.ok) {
        const response = await resp.json();
        console.log(response);
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCity();
  }, []);

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
