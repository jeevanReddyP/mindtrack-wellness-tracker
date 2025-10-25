// src/pages/CalendarView.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isSameDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../utils/calendarLocalizer';

const eventTypes = [
  { value: 'work', label: 'Work', color: '#1976d2' },
  { value: 'personal', label: 'Personal', color: '#388e3c' },
  { value: 'health', label: 'Health', color: '#d32f2f' },
  { value: 'other', label: 'Other', color: '#7b1fa2' }
];

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    type: 'work',
  });

  const handleSelectSlot = ({ start, end }) => {
    setFormData(prev => ({
      ...prev,
      start,
      end,
    }));
    setSelectedEvent(null);
    setOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData(event);
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent) {
      setEvents(events.map(evt => 
        evt.id === selectedEvent.id ? { ...formData, id: selectedEvent.id } : evt
      ));
    } else {
      const newEvent = {
        ...formData,
        id: Date.now().toString()
      };
      setEvents([...events, newEvent]);
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(evt => evt.id !== selectedEvent.id));
      setOpen(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Calendar</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedEvent(null);
            setFormData({
              title: '',
              description: '',
              start: new Date(),
              end: new Date(new Date().setHours(new Date().getHours() + 1)),
              type: 'work',
            });
            setOpen(true);
          }}
        >
          Add Event
        </Button>
      </Box>

      <Paper sx={{ height: 'calc(100vh - 180px)' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            style={{ height: '100%', padding: '1rem' }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: eventTypes.find(t => t.value === event.type)?.color || '#1976d2',
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
              }
            })}
          />
        </LocalizationProvider>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Event Title"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Event Type"
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                {eventTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box display="flex" alignItems="center">
                      <Box 
                        sx={{ 
                          width: 12, 
                          height: 12, 
                          bgcolor: type.color, 
                          borderRadius: '50%',
                          mr: 1
                        }} 
                      />
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box display="flex" gap={2} mb={2}>
                <DatePicker
                  label="Start Date"
                  value={formData.start}
                  onChange={(date) => setFormData({...formData, start: date})}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <TimePicker
                  label="Start Time"
                  value={formData.start}
                  onChange={(time) => setFormData({...formData, start: time})}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>

              <Box display="flex" gap={2} mb={2}>
                <DatePicker
                  label="End Date"
                  value={formData.end}
                  onChange={(date) => setFormData({...formData, end: date})}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <TimePicker
                  label="End Time"
                  value={formData.end}
                  onChange={(time) => setFormData({...formData, end: time})}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>

            <TextField
              margin="dense"
              name="description"
              label="Description (Optional)"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {selectedEvent && (
              <Button 
                onClick={handleDelete} 
                color="error"
                sx={{ mr: 'auto' }}
              >
                Delete
              </Button>
            )}
            <Button type="submit" variant="contained">
              {selectedEvent ? 'Update' : 'Add'} Event
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CalendarView;