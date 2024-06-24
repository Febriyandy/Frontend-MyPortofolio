import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Artikel from "./pages/Artikel";
import Skills from "./components/Skills";
import Admin from "./pages/Admin";
import TambahDataSkill from "./components/TambahDataSkill";
import Login from "./pages/Login";
import DataSkill from "./components/DataSkill";
import EditSkill from "./components/EditSkill";
import TambahDataProject from "./components/TambahDataProject";
import DataProject from "./components/DataProject";
import EditProject from "./components/EditProject";
import TambahDataSertifikat from "./components/TambahDataSertifikat";
import DataSertifikat from "./components/DataSertifikat";
import EditSertifikat from "./components/EditSertifikat";
import TambahDataArtikel from "./components/TambahDataArtikel";
import DataArtikel from "./components/DataArtikel";
import EditArtikel from "./components/EditArtikel";
import DataKontak from "./components/DataKontak";
import Project from "./components/Project";
import DetailProject from "./components/DetailProject";
import Sertifikat from "./components/Sertifikat";
import Footer from "./components/Footer";
import Kontak from "./components/Kontak";
import DetailArtikel from "./components/DetailArtikel";


function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/home" element={ <Home />} />
          <Route path="/nabvar" element={ <Navbar />} />
          <Route path="/artikel" element={ <Artikel />} />
          <Route path="/artikel/detail/:id" element={ <DetailArtikel />} />
          <Route path="/footer" element={ <Footer />} />
          <Route path="/kontak" element={ <Kontak />} />
          <Route path="/skills" element={ <Skills />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/admin" element={ <Admin />} />
          <Route path="/admin/dataSkill" element={ <DataSkill />} />
          <Route path="/admin/dataProject" element={ <DataProject />} />
          <Route path="/admin/editProject" element={ <EditProject />} />
          <Route path="/admin/editSertifikat" element={ <EditSertifikat />} />
          <Route path="/admin/editSkill" element={ <EditSkill />} />
          <Route path="/admin/dataSertifikat" element={ <DataSertifikat />} />
          <Route path="/admin/editArtikel" element={ <EditArtikel />} />
          <Route path="/admin/dataArtikel" element={ <DataArtikel />} />
          <Route path="/admin/dataKontak" element={ <DataKontak />} />
          <Route path="/admin/tambahSkill" element={ <TambahDataSkill />} />
          <Route path="/admin/tambahProject" element={ <TambahDataProject />} />
          <Route path="/admin/tambahSertifikat" element={ <TambahDataSertifikat />} />
          <Route path="/admin/tambahArtikel" element={ <TambahDataArtikel />} />
          <Route path="/admin/project" element={ <Project />} />
          <Route path="/admin/sertifikat" element={ <Sertifikat />} />
          <Route path="/admin/detailProject" element={ <DetailProject />} />
        </Routes>

    </div>
  );
}

export default App;
