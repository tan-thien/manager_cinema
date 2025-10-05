import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import BranchList from "../pages/admin/branches/BranchList";
import BranchCreate from "../pages/admin/branches/BranchCreate";
import BranchEdit from "../pages/admin/branches/BranchEdit";
import CinemaEdit from "../pages/admin/cinemas/CinemaEdit";
import CinemaCreate from "../pages/admin/cinemas/CinemaCreate";
import CinemaList from "../pages/admin/cinemas/CinemaList";
import GenreListPage from "../pages/admin/genre/GenreListPage";
import GenreCreatePage from "../pages/admin/genre/GenreCreatePage";
import GenreEditPage from "../pages/admin/genre/GenreEditPage";
import MovieListPage from "../pages/admin/Movie/MovieListPage";
import MovieCreatePage from "../pages/admin/Movie/MovieCreatePage";
import MovieEditPage from "../pages/admin/Movie/MovieEditPage";
import MovieDetail from "../pages/admin/Movie/MovieDetail";
import NewsEditPage from "../pages/admin/News/NewsEditPage";
import NewsCreatePage from "../pages/admin/News/NewsCreatePage";
import NewsDetailPage from "../pages/admin/News/NewsDetailPage";
import NewsListPage from "../pages/admin/News/NewsListPage";
import ServiceListPage from "../pages/admin/Service/ServiceListPage";
import ServiceCreatePage from "../pages/admin/Service/ServiceCreatePage";
import ServiceEditPage from "../pages/admin/Service/ServiceEditPage";
import ServiceDetailPage from "../pages/admin/Service/ServiceDetailPage";
import SeatListPage from "../pages/admin/Seat/SeatListPage";
import CinemaListPage from "../pages/admin/Seat/CinemaListPage";
import GenerateSeatModal from "../pages/admin/Seat/GenerateSeatModal";
import ScheduleListPage from "../pages/admin/Schedule/ScheduleListPage";
import ScheduleCreatePage from "../pages/admin/Schedule/ScheduleCreatePage";
import ScheduleEditPage from "../pages/admin/Schedule/ScheduleEditPage";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="branches" element={<BranchList />} />
        <Route path="/admin/branches/create" element={<BranchCreate />} />
        <Route path="/admin/branches/edit/:id" element={<BranchEdit />} />
        <Route path="/admin/cinemas" element={<CinemaList />} />
        <Route path="/admin/cinemas/create" element={<CinemaCreate />} />
        <Route path="/admin/cinemas/edit/:id" element={<CinemaEdit />} />
        <Route path="/admin/genres" element={<GenreListPage />} />
        <Route path="/admin/genres/create" element={<GenreCreatePage />} />
        <Route path="/admin/genres/edit/:id" element={<GenreEditPage />} />
        <Route path="/admin/movies" element={<MovieListPage />} />
        <Route path="/admin/movies/create" element={<MovieCreatePage />} />
        <Route path="/admin/movies/edit/:id" element={<MovieEditPage />} />
        <Route path="/admin/movies/:id" element={<MovieDetail />} />
        <Route path="/admin/news/create" element={<NewsCreatePage />} />
        <Route path="/admin/news/edit/:id" element={<NewsEditPage />} />
        <Route path="/admin/news/:id" element={<NewsDetailPage />} />
        <Route path="/admin/news" element={<NewsListPage />} />
        <Route path="/admin/services" element={<ServiceListPage />} />
        <Route path="/admin/services/create" element={<ServiceCreatePage />} />
        <Route path="/admin/services/edit/:id" element={<ServiceEditPage />} />
        <Route path="/admin/services/:id" element={<ServiceDetailPage />} />
        <Route path="/admin/seat/:cinemaId" element={<SeatListPage />} />
        <Route path="/admin/Cinemalist" element={<CinemaListPage />} />
        <Route path="/admin/schedules" element={<ScheduleListPage />} />
        <Route path="/admin/schedules/create" element={<ScheduleCreatePage />} />
        <Route path="/admin/schedules/edit/:id" element={<ScheduleEditPage />} />

        {/* Thêm route con */}
        {/* <Route path="users" element={<UsersPage />} /> */}
        {/* <Route path="movies" element={<MoviesPage />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  </Router>
);

export default AppRoutes;
