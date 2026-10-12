// Unified API Service for VSS SVM Inter College, Arkha

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('vss_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  async updateSettings(settings) {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  // Notices
  async getNotices(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/notices${query ? `?${query}` : ''}`);
    return res.json();
  },
  async createNotice(notice) {
    const res = await fetch(`${API_BASE}/notices`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(notice)
    });
    return res.json();
  },
  async updateNotice(id, updates) {
    const res = await fetch(`${API_BASE}/notices/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  async deleteNotice(id) {
    const res = await fetch(`${API_BASE}/notices/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Events
  async getEvents() {
    const res = await fetch(`${API_BASE}/events`);
    return res.json();
  },
  async createEvent(event) {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(event)
    });
    return res.json();
  },
  async updateEvent(id, updates) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  async deleteEvent(id) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Faculty
  async getFaculty() {
    const res = await fetch(`${API_BASE}/faculty`);
    return res.json();
  },
  async createFaculty(faculty) {
    const res = await fetch(`${API_BASE}/faculty`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(faculty)
    });
    return res.json();
  },
  async updateFaculty(id, updates) {
    const res = await fetch(`${API_BASE}/faculty/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  async deleteFaculty(id) {
    const res = await fetch(`${API_BASE}/faculty/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Facilities
  async getFacilities() {
    const res = await fetch(`${API_BASE}/facilities`);
    return res.json();
  },

  // Gallery
  async getGallery() {
    const res = await fetch(`${API_BASE}/gallery`);
    return res.json();
  },
  async createGalleryItem(item) {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    });
    return res.json();
  },
  async deleteGalleryItem(id) {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Results
  async searchResult(roll, dob) {
    const query = new URLSearchParams({ roll, ...(dob ? { dob } : {}) }).toString();
    const res = await fetch(`${API_BASE}/results/search?${query}`);
    return res.json();
  },
  async getResults() {
    const res = await fetch(`${API_BASE}/results`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async createResult(result) {
    const res = await fetch(`${API_BASE}/results`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(result)
    });
    return res.json();
  },
  async deleteResult(id) {
    const res = await fetch(`${API_BASE}/results/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Downloads
  async getDownloads() {
    const res = await fetch(`${API_BASE}/downloads`);
    return res.json();
  },
  async createDownload(doc) {
    const res = await fetch(`${API_BASE}/downloads`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(doc)
    });
    return res.json();
  },
  async deleteDownload(id) {
    const res = await fetch(`${API_BASE}/downloads/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Enquiries
  async submitEnquiry(enquiry) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    });
    return res.json();
  },
  async getEnquiries() {
    const res = await fetch(`${API_BASE}/enquiries`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async updateEnquiryStatus(id, status) {
    const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  async deleteEnquiry(id) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Contacts
  async submitContact(contact) {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
    return res.json();
  },
  async getContacts() {
    const res = await fetch(`${API_BASE}/contacts`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async deleteContact(id) {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  }
};
