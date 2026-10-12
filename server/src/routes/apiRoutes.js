import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import {
  getSettings,
  updateSettings,
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getFacilities,
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
  searchResult,
  getResults,
  createResult,
  deleteResult,
  getDownloads,
  createDownload,
  deleteDownload,
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  submitContact,
  getContacts,
  deleteContact,
  getStats
} from '../controllers/apiControllers.js';

const router = express.Router();

// Settings
router.get('/settings', getSettings);
router.put('/settings', authenticateAdmin, updateSettings);

// Notices
router.get('/notices', getNotices);
router.post('/notices', authenticateAdmin, createNotice);
router.put('/notices/:id', authenticateAdmin, updateNotice);
router.delete('/notices/:id', authenticateAdmin, deleteNotice);

// Events
router.get('/events', getEvents);
router.post('/events', authenticateAdmin, createEvent);
router.put('/events/:id', authenticateAdmin, updateEvent);
router.delete('/events/:id', authenticateAdmin, deleteEvent);

// Faculty
router.get('/faculty', getFaculty);
router.post('/faculty', authenticateAdmin, createFaculty);
router.put('/faculty/:id', authenticateAdmin, updateFaculty);
router.delete('/faculty/:id', authenticateAdmin, deleteFaculty);

// Facilities
router.get('/facilities', getFacilities);

// Gallery
router.get('/gallery', getGallery);
router.post('/gallery', authenticateAdmin, createGalleryItem);
router.delete('/gallery/:id', authenticateAdmin, deleteGalleryItem);

// Results
router.get('/results/search', searchResult);
router.get('/results', authenticateAdmin, getResults);
router.post('/results', authenticateAdmin, createResult);
router.delete('/results/:id', authenticateAdmin, deleteResult);

// Downloads
router.get('/downloads', getDownloads);
router.post('/downloads', authenticateAdmin, createDownload);
router.delete('/downloads/:id', authenticateAdmin, deleteDownload);

// Admission Enquiries
router.post('/enquiries', submitEnquiry);
router.get('/enquiries', authenticateAdmin, getEnquiries);
router.patch('/enquiries/:id/status', authenticateAdmin, updateEnquiryStatus);
router.delete('/enquiries/:id', authenticateAdmin, deleteEnquiry);

// Contacts
router.post('/contacts', submitContact);
router.get('/contacts', authenticateAdmin, getContacts);
router.delete('/contacts/:id', authenticateAdmin, deleteContact);

// Admin Dashboard Summary Stats
router.get('/stats', authenticateAdmin, getStats);

export default router;
