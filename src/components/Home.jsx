import { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const fetchAllCities = async () => {
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=3&appid=44ec3e35b6cc604242ad14fd87fac22c`;
    try {
      const resp = await fetch(endpoint);
      if (resp.ok) {
        const response = await resp.json();
        console.log(response);
        setLat(response[0].lat);
        setLon(response[0].lon);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherInfo = async () => {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=44ec3e35b6cc604242ad14fd87fac22c`;
    try {
      const resp = await fetch(endpoint);
      if (resp.ok) {
        const response = await resp.json();
        console.log(response);
        setWeather(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCities();
  }, [cityName]);

  useEffect(() => {
    fetchWeatherInfo();
  }, [lat, lon]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  if ((lat, lon, cityName)) {
    return (
      <>
        <Container className="d-flex justify-content-center align-items-center">
          <div className="m-5 p-3 rounded bg-success bg-opacity-50">
            <InputGroup className="mb-3">
              <FormControl
                onSubmit={handleSubmit}
                placeholder="Insert city name here..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                className="rounded-pill searchbar"
              />
              <Button
                variant="warning"
                onClick={(e) => {
                  setCityName(e.target.previousElementSibling.value);
                }}
              >
                Search
              </Button>
            </InputGroup>
          </div>
        </Container>
        <Container className="justify-content-center">
          <Row className="justify-content-center">
            <Col xs={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{cityName}</Card.Title>
                  <Card.Text>{weather.main.temp + "°C"}</Card.Text>
                  <Link className="btn btn-primary" to={`/${weather.id}`}>
                    Weather Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <div className="m-5 p-3 rounded bg-success bg-opacity-50">
          <InputGroup className="mb-3">
            <FormControl
              onSubmit={handleSubmit}
              placeholder="Insert city name here..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              className="rounded-pill searchbar"
            />
            <Button
              variant="warning"
              onClick={(e) => {
                setCityName(e.target.previousElementSibling.value);
              }}
            >
              Search
            </Button>
          </InputGroup>
        </div>
      </Container>
    );
  }
};

export default Home;
