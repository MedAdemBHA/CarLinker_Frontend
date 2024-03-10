import { Route, Routes } from 'react-router-dom';

import About from '@/pages/main/About';
import Contact from '@/pages/main/Contact';
import Home from '@/pages/main/Home';
import MainLayout from '@/pages/main/mainLayout';
import NotFoundPage from '@/pages/main/notFound/notFound';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;
