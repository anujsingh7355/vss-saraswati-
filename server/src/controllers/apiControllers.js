import { dbStore } from '../utils/dbStore.js';

// --- SETTINGS (Requirement #21 editable data) ---
export const getSettings = (req, res) => {
  res.json({ success: true, data: dbStore.getSettings() });
};

export const updateSettings = (req, res) => {
  try {
    const updated = dbStore.updateSettings(req.body);
    res.json({ success: true, message: 'School settings updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- NOTICES ---
export const getNotices = (req, res) => {
  let notices = dbStore.getNotices();
  if (req.query.category) {
    notices = notices.filter(n => n.category.toLowerCase() === req.query.category.toLowerCase());
  }
  if (req.query.important === 'true') {
    notices = notices.filter(n => n.isImportant);
  }
  res.json({ success: true, data: notices });
};

export const createNotice = (req, res) => {
  try {
    const { title, titleHindi, category, description, isImportant, pdfUrl, date } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Notice title is required.' });
    }
    const created = dbStore.createNotice({
      title,
      titleHindi: titleHindi || title,
      category: category || 'General',
      description: description || '',
      isImportant: Boolean(isImportant),
      pdfUrl: pdfUrl || '',
      date: date || new Date().toISOString().split('T')[0]
    });
    res.status(201).json({ success: true, message: 'Notice published successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateNotice = (req, res) => {
  try {
    const updated = dbStore.updateNotice(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }
    res.json({ success: true, message: 'Notice updated successfully.', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteNotice = (req, res) => {
  const deleted = dbStore.deleteNotice(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Notice not found.' });
  }
  res.json({ success: true, message: 'Notice deleted successfully.' });
};

// --- EVENTS ---
export const getEvents = (req, res) => {
  res.json({ success: true, data: dbStore.getEvents() });
};

export const createEvent = (req, res) => {
  try {
    const { title, titleHindi, date, time, location, category, description, image, status } = req.body;
    if (!title || !date) {
      return res.status(400).json({ success: false, message: 'Event title and date are required.' });
    }
    const created = dbStore.createEvent({
      title,
      titleHindi: titleHindi || title,
      date,
      time: time || '10:00 AM',
      location: location || 'School Campus, Arkha',
      category: category || 'General',
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
      status: status || 'Upcoming'
    });
    res.status(201).json({ success: true, message: 'Event added successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEvent = (req, res) => {
  const updated = dbStore.updateEvent(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Event not found.' });
  }
  res.json({ success: true, message: 'Event updated successfully.', data: updated });
};

export const deleteEvent = (req, res) => {
  const deleted = dbStore.deleteEvent(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Event not found.' });
  }
  res.json({ success: true, message: 'Event deleted successfully.' });
};

// --- FACULTY ---
export const getFaculty = (req, res) => {
  res.json({ success: true, data: dbStore.getFaculty() });
};

export const createFaculty = (req, res) => {
  try {
    const { name, designation, department, subject, qualification, experience, photo } = req.body;
    if (!name || !designation) {
      return res.status(400).json({ success: false, message: 'Name and designation are required.' });
    }
    const created = dbStore.createFaculty({
      name,
      designation,
      department: department || 'General',
      subject: subject || 'General',
      qualification: qualification || 'M.A., B.Ed.',
      experience: experience || '5 Years',
      photo: photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600'
    });
    res.status(201).json({ success: true, message: 'Faculty member added successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateFaculty = (req, res) => {
  const updated = dbStore.updateFaculty(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Faculty member not found.' });
  }
  res.json({ success: true, message: 'Faculty details updated successfully.', data: updated });
};

export const deleteFaculty = (req, res) => {
  const deleted = dbStore.deleteFaculty(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Faculty member not found.' });
  }
  res.json({ success: true, message: 'Faculty member removed successfully.' });
};

// --- FACILITIES ---
export const getFacilities = (req, res) => {
  res.json({ success: true, data: dbStore.getFacilities() });
};

// --- GALLERY ---
export const getGallery = (req, res) => {
  res.json({ success: true, data: dbStore.getGallery() });
};

export const createGalleryItem = (req, res) => {
  try {
    const { title, album, image } = req.body;
    if (!title || !image) {
      return res.status(400).json({ success: false, message: 'Title and image URL are required.' });
    }
    const created = dbStore.createGalleryItem({
      title,
      album: album || 'School Campus',
      image
    });
    res.status(201).json({ success: true, message: 'Photo added to gallery.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteGalleryItem = (req, res) => {
  const deleted = dbStore.deleteGalleryItem(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Gallery item not found.' });
  }
  res.json({ success: true, message: 'Photo deleted from gallery.' });
};

// --- RESULTS (Online Marksheet Check) ---
export const searchResult = (req, res) => {
  const { roll, dob } = req.query;
  if (!roll) {
    return res.status(400).json({ success: false, message: 'Roll number is required to search results.' });
  }
  const result = dbStore.searchResult(roll, dob);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'No result record found for the provided Roll Number / Date of Birth. Please verify credentials with the examination department.'
    });
  }
  res.json({ success: true, data: result });
};

export const getResults = (req, res) => {
  res.json({ success: true, data: dbStore.getResults() });
};

export const createResult = (req, res) => {
  try {
    const { rollNumber, studentName, fatherName, classLevel, subjects, totalMarks, maxTotal, percentage, status, division, dob } = req.body;
    if (!rollNumber || !studentName) {
      return res.status(400).json({ success: false, message: 'Roll number and student name are required.' });
    }
    const created = dbStore.createResult({
      rollNumber,
      dob: dob || '2008-01-01',
      studentName,
      fatherName: fatherName || '',
      classLevel: classLevel || 'Class 10th',
      subjects: subjects || [],
      totalMarks: Number(totalMarks) || 0,
      maxTotal: Number(maxTotal) || 500,
      percentage: Number(percentage) || 0,
      status: status || 'PASSED',
      division: division || 'First Division',
      year: new Date().getFullYear().toString()
    });
    res.status(201).json({ success: true, message: 'Student result recorded successfully.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteResult = (req, res) => {
  const deleted = dbStore.deleteResult(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Result not found.' });
  }
  res.json({ success: true, message: 'Result record deleted.' });
};

// --- DOWNLOADS ---
export const getDownloads = (req, res) => {
  res.json({ success: true, data: dbStore.getDownloads() });
};

export const createDownload = (req, res) => {
  try {
    const { title, category, url, description, fileSize } = req.body;
    if (!title || !url) {
      return res.status(400).json({ success: false, message: 'Title and file URL are required.' });
    }
    const created = dbStore.createDownload({
      title,
      category: category || 'General',
      url,
      description: description || '',
      fileSize: fileSize || '1.2 MB'
    });
    res.status(201).json({ success: true, message: 'Document added to downloads.', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteDownload = (req, res) => {
  const deleted = dbStore.deleteDownload(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Document not found.' });
  }
  res.json({ success: true, message: 'Download document deleted.' });
};

// --- ADMISSION ENQUIRIES ---
export const submitEnquiry = (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      dob,
      selectedClass,
      mobile,
      email,
      address,
      previousSchool,
      message
    } = req.body;

    if (!studentName || !fatherName || !mobile || !selectedClass) {
      return res.status(400).json({
        success: false,
        message: 'Student name, father name, mobile number, and target class are required.'
      });
    }

    const created = dbStore.createEnquiry({
      studentName,
      fatherName,
      motherName: motherName || '',
      dob: dob || '',
      selectedClass,
      mobile,
      email: email || '',
      address: address || '',
      previousSchool: previousSchool || '',
      message: message || ''
    });

    console.log(`[Notification to School Admin] New Admission Enquiry received from ${studentName} (${mobile}) for ${selectedClass}!`);

    res.status(201).json({
      success: true,
      message: 'Admission Enquiry submitted successfully! Our admissions counselor will contact you shortly.',
      enquiryId: created.id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEnquiries = (req, res) => {
  res.json({ success: true, data: dbStore.getEnquiries() });
};

export const updateEnquiryStatus = (req, res) => {
  const { status } = req.body;
  const updated = dbStore.updateEnquiryStatus(req.params.id, status || 'Reviewed');
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }
  res.json({ success: true, message: 'Enquiry status updated.', data: updated });
};

export const deleteEnquiry = (req, res) => {
  const deleted = dbStore.deleteEnquiry(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }
  res.json({ success: true, message: 'Enquiry deleted successfully.' });
};

// --- CONTACT MESSAGES ---
export const submitContact = (req, res) => {
  try {
    const { name, mobile, email, subject, message } = req.body;
    if (!name || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, mobile number, and message are required.'
      });
    }
    const created = dbStore.createContact({
      name,
      mobile,
      email: email || '',
      subject: subject || 'General Query',
      message
    });
    console.log(`[Notification] New Contact Message from ${name} (${mobile}): ${subject}`);
    res.status(201).json({
      success: true,
      message: 'Your message has been sent to the school office. Thank you!'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getContacts = (req, res) => {
  res.json({ success: true, data: dbStore.getContacts() });
};

export const deleteContact = (req, res) => {
  const deleted = dbStore.deleteContact(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }
  res.json({ success: true, message: 'Message deleted successfully.' });
};

// --- STATS ---
export const getStats = (req, res) => {
  res.json({ success: true, data: dbStore.getStats() });
};
