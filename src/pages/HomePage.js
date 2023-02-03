import SectionCarouselComponent from "../components/SectionCarouselComponent";
import CategoryCardComponent from "../components/CategoryCardComponent";
import { Button, Card, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import dayjs from 'dayjs';
import "../pages/HomePage.css"
import { Link } from "react-router-dom";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const [profile, setProfile] = useState([])
  const baseURL = process.env.REACT_APP_API_URL;

  const getProfile = () => {
    axios
      .get(baseURL + "/api/users/" + user?._id, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setProfile(res.data)
      })
      .catch((error) => console.log(error));
  }
  console.log(user);
  useEffect(() => {
    getProfile();
  }, [user?._id])

  let now = new Date(dayjs());
  let dueDay = new Date(profile?.dueDayOfBaby);

  let remainDay = Math.round((dueDay.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  let pregnancyWeek = 40 - Math.round(remainDay / 7)

  let url;
  let text;

  switch (pregnancyWeek) {
    case 4:
      url = "https://assets.babycenter.com/ims/2020/11/4-weeks-poppy-seeds_wide.jpg?width=563";
      text = "4 weeks: Your baby is the size of a poppy seed";
      break
    case 5:
      url = "https://assets.babycenter.com/ims/2020/11/5-weeks-sesame-seeds_wide.jpg?width=563";
      text = "5 weeks: Your baby is about the size of a sesame see";
      break
    case 6:
      url = "https://assets.babycenter.com/ims/2020/11/6-weeks-lentil_wide.jpg?width=563";
      text = "6 weeks: Your baby is about the size of a lentil";
      break
    case 7:
      url = "https://assets.babycenter.com/ims/2020/11/7-weeks-blueberry_wide.jpg?width=563";
      text = "7 weeks: Your baby is about the size of a blueberry";
      break
    case 8:
      url = "https://assets.babycenter.com/ims/2020/11/8-weeks-kidney-bean_wide.jpg?width=563";
      text = "8 weeks: Your baby is about the size of a kidney bean";
      break
    case 9:
      url = "https://assets.babycenter.com/ims/2020/11/9-weeks-grape_wide.jpg?width=563";
      text = "9 weeks: Your baby is about the size of a grape4 weeks: Your baby is the size of a poppy seed";
      break
    case 10:
      url = "https://assets.babycenter.com/ims/2020/11/10-weeks-kumquat_wide.jpg?width=563";
      text = "10 weeks: Your baby is about the size of a kumquat";
      break
    case 11:
      url = "https://assets.babycenter.com/ims/2020/11/11-weeks-fig_wide.jpg?width=563";
      text = "11 weeks: Your baby is about the size of a fig";
      break
    case 12:
      url = "https://assets.babycenter.com/ims/2020/11/12-weeks-lime_wide.jpg?width=563";
      text = "12 weeks: Your baby is about the size of a lime";
      break
    case 13:
      url = "https://assets.babycenter.com/ims/2020/11/13-weeks-pea-pod_wide.jpg?width=563";
      text = "13 weeks: Your baby is about the size of a peapod";
      break
    case 14:
      url = "https://assets.babycenter.com/ims/2020/11/14-weeks-lemon_wide.jpg?width=563";
      text = "14 weeks: Your baby is about the size of a lemon";
      break
    case 15:
      url = "https://assets.babycenter.com/ims/2020/11/15-weeks-apple_wide.jpg?width=563";
      text = "15 weeks: Your baby is about the size of an apple";
      break
    case 16:
      url = "https://assets.babycenter.com/ims/2020/11/16-weeks-avocado_wide.jpg?width=563";
      text = "16 weeks: Your baby is about the size of an avocado";
      break
    case 17:
      url = "https://assets.babycenter.com/ims/2020/11/17-weeks-turnip_wide.jpg?width=563";
      text = "17 weeks: Your baby is about the size of a turnip";
      break
    case 18:
      url = "https://assets.babycenter.com/ims/2020/11/18-weeks-bellpepper_wide.jpg?width=563";
      text = "18 weeks: Your baby is about the size of a bell pepper";
      break
    case 19:
      url = "https://assets.babycenter.com/ims/2020/11/19-weeks-tomato_wide.jpg?width=563";
      text = "19 weeks: Your baby is about the size of an heirloom tomato";
      break
    case 20:
      url = "https://assets.babycenter.com/ims/2020/11/20-weeks-banana_wide.jpg?width=563";
      text = "20 weeks: Your baby is about the length of a banana";
      break
    case 21:
      url = "https://assets.babycenter.com/ims/2020/11/21-weeks-carrot_wide.jpg?width=563";
      text = "21 weeks: Your baby is about as long as a carrot";
      break
    case 22:
      url = "https://assets.babycenter.com/ims/2020/11/22-weeks-spaghetti-squash_wide.jpg?width=563";
      text = "22 weeks: Your baby is about the size of a spaghetti squash";
      break
    case 23:
      url = "https://assets.babycenter.com/ims/2020/11/23-weeks-mango_wide.jpg?width=563";
      text = "23 weeks: Your baby is about the size of a large mango";
      break
    case 24:
      url = "https://assets.babycenter.com/ims/2020/11/24-weeks-corn_wide.jpg?width=563";
      text = "24 weeks: Your baby is about as long as an ear of corn";
      break
    case 25:
      url = "https://assets.babycenter.com/ims/2020/11/25-weeks-rutabaga_wide.jpg?width=563";
      text = "25 weeks: Your baby is about the size of a rutabaga";
      break
    case 26:
      url = "https://assets.babycenter.com/ims/2020/11/26-weeks-scallions_wide.jpg?width=563";
      text = "26 weeks: Your baby is about the length of a scallion";
      break
    case 27:
      url = "https://assets.babycenter.com/ims/2020/11/27-weeks-cauliflower_wide.jpg?width=563";
      text = "27 weeks: Your baby is about the size of a head of cauliflower";
      break
    case 28:
      url = "https://assets.babycenter.com/ims/2020/11/28-weeks-eggplant_wide.jpg?width=563";
      text = "28 weeks: Your baby is about the size of a large eggplant";
      break
    case 29:
      url = "https://assets.babycenter.com/ims/2020/11/29-weeks-butternut-squash_wide.jpg?width=563";
      text = "29 weeks: Your baby is about the size of a butternut squash";
      break
    case 30:
      url = "https://assets.babycenter.com/ims/2020/11/30-weeks-cabbage_wide.jpg?width=563";
      text = "30 weeks: Your baby is about the size of a large cabbage";
      break
    case 31:
      url = "https://assets.babycenter.com/ims/2020/11/31-weeks-coconut_wide.jpg?width=563";
      text = "31 weeks: Your baby is about the size of a coconut";
      break
    case 32:
      url = "https://assets.babycenter.com/ims/2020/11/32-weeks-jicama_wide.jpg?width=563";
      text = "32 weeks: Your baby is about the size of a jicama";
      break
    case 33:
      url = "https://assets.babycenter.com/ims/2020/11/33-weeks-pineapple_wide.jpg?width=563";
      text = "33 weeks: Your baby is about the size of a pineapple";
      break
    case 34:
      url = "https://assets.babycenter.com/ims/2020/11/34-weeks-cantaloupe_wide.jpg?width=563";
      text = "34 weeks: Your baby is about the size of cantaloupe";
      break
    case 35:
      url = "https://assets.babycenter.com/ims/2020/11/35-weeks-honeydew_wide.jpg?width=563";
      text = "35 weeks: Your baby is about the size of a honeydew melon";
      break
    case 36:
      url = "https://assets.babycenter.com/ims/2020/11/36-weeks-lettuce_wide.jpg?width=563";
      text = "36 weeks: Your baby is about as long as a head of romaine lettuce";
      break
    case 37:
      url = "https://assets.babycenter.com/ims/2020/11/37-weeks-collard-greens_wide.jpg?width=563";
      text = "37 weeks: Your baby is about the length of a bunch of Swiss chard";
      break
    case 38:
      url = "https://assets.babycenter.com/ims/2020/11/38-weeks-leek_wide.jpg?width=563";
      text = "38 weeks: Your baby is about the length of a leek";
      break
    case 39:
      url = "https://assets.babycenter.com/ims/2020/11/39-weeks-watermelon_wide.jpg?width=563";
      text = "39 weeks: Your baby is about the size of a mini-watermelon";
      break
    case 40:
      url = "https://assets.babycenter.com/ims/2020/11/40-weeks-pumpkin_wide.jpg?width=563";
      text = "40 weeks: Your baby is about the size of a small pumpkin";
      break
    default:
      url = "https://assets.babycenter.com/ims/2020/11/4-weeks-poppy-seeds_wide.jpg?width=563";
      text = "1-3 weeks: Your baby is the size of a poppy seed";
  }
  console.log("week" + pregnancyWeek);

  const getAllCategories = () => {

    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${baseURL}/api/categories`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="HomePage">
      <SectionCarouselComponent />
      <Container>
        <Row xs={1} md={2} lg={3} className=" g-4 mt-2">
          {categories.map((category) => {
            return <CategoryCardComponent key={category._id} category={category} />;
          })}
        </Row>
      </Container>
      {remainDay > 0
        ?
        <div className="babyMessage">
          <h1 id="msgTitle">Congratulations! Your will see your baby after <span>{remainDay}</span> day(s)!</h1>
          <img src={url} />
          <p id="msgP">{text}</p>
        </div>
        : <Container className="anotherHomepage">
          <Card style={{ width: '15rem' }}>
            <Card.Body className="blueCard">
              <Link to={`/posts`}>
                <Card.Title>Posts</Card.Title>
                <Card.Text>
                  Do you have questions about parenting? See what others have to say!
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '15rem' }}>
            <Card.Body className="yellowCard">
              <Link to={`/resources`}>
                <Card.Title>Resources</Card.Title>
                <Card.Text>
                  Here you can find lots of resources. You can get help, advice, services and more. Also, you can share.
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '15rem' }}>
            <Card.Body className="blueCard">
              <Link to={`/random-dad-jokes`}>
                <Card.Title>Dad Jokes</Card.Title>
                <Card.Text>
                  Feel stressful? Let's relax by the dad jokes!
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>

          {user?._id
          ?
          <Card style={{ width: '15rem' }}>
            <Card.Body className="yellowCard">
              <Link to={`/profiles/${user._id}`}>
                <Card.Title>My Profile</Card.Title>
                <Card.Text>
                  Lots of functions on user profile. Let's explore!
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>
          :
          <Card style={{ width: '15rem' }}>
            <Card.Body className="yellowCard">
              <Link to={`/signup`}>
                <Card.Title>Join us</Card.Title>
                <Card.Text>
                  Lots of functions of users. Not a member yet? sign up now!
                </Card.Text>
              </Link>
            </Card.Body>
          </Card>
          }
          
        </Container>
      }

    </div>
  );
}

export default HomePage;
