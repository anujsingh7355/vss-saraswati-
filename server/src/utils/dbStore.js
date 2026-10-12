import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialSettings,
  initialNotices,
  initialEvents,
  initialFaculty,
  initialFacilities,
  initialGallery,
  initialResults,
  initialDownloads,
  initialEnquiries,
  initialContacts
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class DatabaseStore {
  constructor() {
    this.data = {
      settings: initialSettings,
      notices: initialNotices,
      events: initialEvents,
      faculty: initialFaculty,
      facilities: initialFacilities,
      gallery: initialGallery,
      results: initialResults,
      downloads: initialDownloads,
      enquiries: initialEnquiries,
      contacts: initialContacts
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...this.data, ...parsed };
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn('Could not read persistent file store, using in-memory defaults:', err.message);
    }
  }

  persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save to db.json:', err.message);
    }
  }

  // --- Settings ---
  getSettings() {
    return this.data.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.persist();
    return this.data.settings;
  }

  // --- Notices ---
  getNotices() {
    return this.data.notices;
  }

  getNoticeById(id) {
    return this.data.notices.find(n => n.id === id);
  }

  createNotice(notice) {
    const item = {
      id: `not-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...notice
    };
    this.data.notices.unshift(item);
    this.persist();
    return item;
  }

  updateNotice(id, updates) {
    const idx = this.data.notices.findIndex(n => n.id === id);
    if (idx === -1) return null;
    this.data.notices[idx] = { ...this.data.notices[idx], ...updates };
    this.persist();
    return this.data.notices[idx];
  }

  deleteNotice(id) {
    const idx = this.data.notices.findIndex(n => n.id === id);
    if (idx === -1) return false;
    this.data.notices.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Events ---
  getEvents() {
    return this.data.events;
  }

  getEventById(id) {
    return this.data.events.find(e => e.id === id);
  }

  createEvent(event) {
    const item = {
      id: `evt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...event
    };
    this.data.events.unshift(item);
    this.persist();
    return item;
  }

  updateEvent(id, updates) {
    const idx = this.data.events.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.events[idx] = { ...this.data.events[idx], ...updates };
    this.persist();
    return this.data.events[idx];
  }

  deleteEvent(id) {
    const idx = this.data.events.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.data.events.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Faculty ---
  getFaculty() {
    return this.data.faculty;
  }

  createFaculty(faculty) {
    const item = {
      id: `fac-${Date.now()}`,
      ...faculty
    };
    this.data.faculty.push(item);
    this.persist();
    return item;
  }

  updateFaculty(id, updates) {
    const idx = this.data.faculty.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.data.faculty[idx] = { ...this.data.faculty[idx], ...updates };
    this.persist();
    return this.data.faculty[idx];
  }

  deleteFaculty(id) {
    const idx = this.data.faculty.findIndex(f => f.id === id);
    if (idx === -1) return false;
    this.data.faculty.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Facilities ---
  getFacilities() {
    return this.data.facilities;
  }

  // --- Gallery ---
  getGallery() {
    return this.data.gallery;
  }

  createGalleryItem(item) {
    const newItem = {
      id: `gal-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...item
    };
    this.data.gallery.unshift(newItem);
    this.persist();
    return newItem;
  }

  deleteGalleryItem(id) {
    const idx = this.data.gallery.findIndex(g => g.id === id);
    if (idx === -1) return false;
    this.data.gallery.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Results ---
  getResults() {
    return this.data.results;
  }

  searchResult(rollNumber, dob) {
    if (!rollNumber) return null;
    const cleanRoll = rollNumber.toString().trim().toLowerCase();
    return this.data.results.find(r => {
      const matchRoll = r.rollNumber.toString().trim().toLowerCase() === cleanRoll;
      if (!matchRoll) return false;
      if (dob) {
        // Compare date loosely (YYYY-MM-DD or partial)
        const studentDob = r.dob ? r.dob.trim() : '';
        const inputDob = dob.trim();
        return studentDob === inputDob;
      }
      return true;
    });
  }

  createResult(result) {
    const item = {
      id: `res-${Date.now()}`,
      ...result
    };
    this.data.results.unshift(item);
    this.persist();
    return item;
  }

  updateResult(id, updates) {
    const idx = this.data.results.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.data.results[idx] = { ...this.data.results[idx], ...updates };
    this.persist();
    return this.data.results[idx];
  }

  deleteResult(id) {
    const idx = this.data.results.findIndex(r => r.id === id);
    if (idx === -1) return false;
    this.data.results.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Downloads ---
  getDownloads() {
    return this.data.downloads;
  }

  createDownload(item) {
    const newItem = {
      id: `dl-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      ...item
    };
    this.data.downloads.unshift(newItem);
    this.persist();
    return newItem;
  }

  deleteDownload(id) {
    const idx = this.data.downloads.findIndex(d => d.id === id);
    if (idx === -1) return false;
    this.data.downloads.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Enquiries (Admission) ---
  getEnquiries() {
    return this.data.enquiries;
  }

  createEnquiry(enquiry) {
    const item = {
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...enquiry
    };
    this.data.enquiries.unshift(item);
    this.persist();
    return item;
  }

  updateEnquiryStatus(id, status) {
    const idx = this.data.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.enquiries[idx].status = status;
    this.persist();
    return this.data.enquiries[idx];
  }

  deleteEnquiry(id) {
    const idx = this.data.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.data.enquiries.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Contact Enquiries ---
  getContacts() {
    return this.data.contacts;
  }

  createContact(contact) {
    const item = {
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...contact
    };
    this.data.contacts.unshift(item);
    this.persist();
    return item;
  }

  deleteContact(id) {
    const idx = this.data.contacts.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.data.contacts.splice(idx, 1);
    this.persist();
    return true;
  }

  // --- Stats for Admin Dashboard ---
  getStats() {
    return {
      totalEnquiries: this.data.enquiries.length,
      pendingEnquiries: this.data.enquiries.filter(e => e.status === 'Pending').length,
      totalNotices: this.data.notices.length,
      totalEvents: this.data.events.length,
      totalFaculty: this.data.faculty.length,
      totalResults: this.data.results.length,
      totalDownloads: this.data.downloads.length,
      totalContacts: this.data.contacts.length
    };
  }
}

export const dbStore = new DatabaseStore();
