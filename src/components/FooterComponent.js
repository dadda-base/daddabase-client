import { Col, Container, Row } from "react-bootstrap";
const FooterComponent = () => {
  return (
    <footer>
      <Container fluid>
        <Row className="mt-5">
          <Col className="bg-light text-center text-black py-1 Footer">
              <div className="ms-5 footer-links">
                <span className="contact">Xavier Chang</span>
                <a
                  href="https://www.facebook.com/lavender.chang.526/"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook fa-2x socials"></i>
                </a>
                <a href="https://github.com/Xavier-Chang" target="_blank">
                  <i className="fa-brands fa-github fa-2x socials"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/xavier-chang-418827240/"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin fa-2x socials"></i>
                </a>
              </div>
              <div className="ms-5 footer-links" >
                <span className="contact">Dave Mullally</span>
                <a
                  href="https://www.facebook.com/david.mullally.7"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook fa-2x socials"></i>
                </a>
                <a href="https://twitter.com/IMeamtWhatISaid" target="_blank">
                  <i className="fa-brands fa-twitter fa-2x socials"></i>
                </a>
                <a
                  href="https://www.instagram.com/1meantwhat1said/"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram fa-2x socials"></i>
                </a>
                <a href="https://github.com/David-Mullally" target="_blank">
                  <i className="fa-brands fa-github fa-2x socials"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/david-mullally-393100256/"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin fa-2x socials"></i>
                </a>
              </div>
            <span>Copyright &copy; DaddaBase</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
