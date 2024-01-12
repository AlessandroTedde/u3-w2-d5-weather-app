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
          <div className="mt-5 mb-2 p-3 rounded home shadow">
            <h1 className="display-2 mb-3">Welcome to EpiWeather!</h1>
            <h3 className="fw-semibold mb-2">Insert a city name to know what's the weather</h3>
            <InputGroup className="my-3 justify-content-center">
              <FormControl
                onSubmit={handleSubmit}
                placeholder="Insert city name here..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                className="rounded-pill searchbar"
              />
              <Button
                className="ms-2 rounded"
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
              <Card className="cardbg text-white">
                <Card.Body>
                  <Card.Title className="fw-semibold">{cityName}</Card.Title>
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
        <div className="mt-5 mb-2 p-5 rounded bg-success bg-opacity-50 shadow">
          <h1 className="display-2 mb-3">Welcome to EpiWeather!</h1>
          <h3 className="fw-semibold mb-2 fs-4">Insert a city name to know what's the weather</h3>
          <InputGroup className="my-3 justify-content-center">
            <FormControl
              onSubmit={handleSubmit}
              placeholder="Insert city name here..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              className="rounded-pill searchbar"
            />
            <Button
              className="ms-2 rounded"
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
