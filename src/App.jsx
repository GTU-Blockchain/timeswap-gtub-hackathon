import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NewServices from "./pages/NewServices";
import TimeBank from "./pages/TimeBank";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <BrowserRouter basename="/timeswap-gtub-hackathon">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/new-services" element={<NewServices />} />
                    <Route path="/time-bank" element={<TimeBank />} />
                    <Route path="/explore/" element={<Explore />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
