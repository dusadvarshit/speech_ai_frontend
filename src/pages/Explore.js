import FileList from '../components/FileList';
import { Container, Row, Col } from 'reactstrap';


export default function Explore() {
  return (
    <>
      <Row className="justify-content-center">
          <FileList />
      </Row>
    </>
  );
}
