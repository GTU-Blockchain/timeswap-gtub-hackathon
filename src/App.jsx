import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NewServices from "./pages/NewServices";
import TimeBank from "./pages/TimeBank";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import Wallet from "./pages/Wallet";
import Details from "./pages/Details";
import ProfileComment from "./pages/ProfileComment"; // temporarily added.

function App() {
    return (
        <>
            <BrowserRouter basename="/timeswap-gtub-hackathon">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:address" element={<Profile />} />
                    <Route
                        path="/profile/:address/comments"
                        element={<ProfileComment />}
                    />
                    <Route path="/create" element={<NewServices />} />
                    <Route path="/confirm" element={<TimeBank />} />
                    <Route path="/explore/" element={<Explore />} />
                    <Route path="/explore/:id" element={<Details />} />
                    <Route path="/skill/:id" element={<Details />} />
                    <Route path="/wallet/:address" element={<Wallet />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
