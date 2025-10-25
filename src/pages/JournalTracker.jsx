import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
  Grid,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Mood as MoodIcon,
  MoodBad as MoodBadIcon,
  SentimentVeryDissatisfied as SadIcon,
  SentimentSatisfied as NeutralIcon,
  SentimentSatisfiedAlt as HappyIcon,
  SentimentVerySatisfied as VeryHappyIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  Label as LabelIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subDays, isToday, isThisWeek, isThisMonth } from 'date-fns';

const moodOptions = [
  { value: 'very_happy', label: 'Very Happy', icon: <VeryHappyIcon color="success" />, color: '#4caf50' },
  { value: 'happy', label: 'Happy', icon: <HappyIcon color="success" />, color: '#8bc34a' },
  { value: 'neutral', label: 'Neutral', icon: <NeutralIcon color="warning" />, color: '#ffc107' },
  { value: 'sad', label: 'Sad', icon: <SadIcon color="error" />, color: '#ff9800' },
  { value: 'very_sad', label: 'Very Sad', icon: <MoodBadIcon color="error" />, color: '#f44336' },
];

const tagOptions = [
  'Work', 'Personal', 'Health', 'Family', 'Friends', 
  'Exercise', 'Food', 'Travel', 'Hobbies', 'Goals'
];

const JournalTracker = () => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    date: new Date(),
  });

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData(prev => ({
      ...prev,
      tags: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEntries(entries.map(entry => 
        entry.id === editingId ? { ...formData, id: editingId } : entry
      ));
      setEditingId(null);
    } else {
      const newEntry = {
        ...formData,
        id: Date.now().toString(),
        date: formData.date || new Date()
      };
      setEntries([newEntry, ...entries]);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      mood: 'neutral',
      tags: [],
      date: new Date(),
    });
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const confirmDelete = (entry) => {
    setEntryToDelete(entry);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (entryToDelete) {
      setEntries(entries.filter(entry => entry.id !== entryToDelete.id));
      setDeleteConfirmOpen(false);
      setEntryToDelete(null);
    }
  };

  const getMoodIcon = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue) || moodOptions[2]; // Default to neutral
    return mood.icon;
  };

  const getMoodColor = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue) || moodOptions[2]; // Default to neutral
    return mood.color;
  };

  const filteredEntries = entries.filter(entry => {
    // Date filtering
    const entryDate = new Date(entry.date);
    const now = new Date();
    let dateMatch = true;
    
    if (dateRange === 'today') {
      dateMatch = isToday(entryDate);
    } else if (dateRange === 'week') {
      dateMatch = isThisWeek(entryDate);
    } else if (dateRange === 'month') {
      dateMatch = isThisMonth(entryDate);
    }

    // Mood filtering
    const moodMatch = filter === 'all' || entry.mood === filter;

    // Search query
    const searchMatch = 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());

    // Tags filtering
    const tagsMatch = 
      selectedTags.length === 0 || 
      selectedTags.every(tag => entry.tags.includes(tag));

    return dateMatch && moodMatch && searchMatch && tagsMatch;
  });

  const moodStats = moodOptions.map(mood => ({
    ...mood,
    count: entries.filter(e => e.mood === mood.value).length
  }));

  const tagCounts = tagOptions.reduce((acc, tag) => {
    acc[tag] = entries.filter(e => e.tags.includes(tag)).length;
    return acc;
  }, {});

  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4">Journal</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            resetForm();
          }}
        >
          {showForm ? 'Cancel' : 'New Entry'}
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={1} flexWrap="wrap">
                <ToggleButtonGroup
                  value={dateRange}
                  exclusive
                  onChange={(e, newRange) => newRange && setDateRange(newRange)}
                  size="small"
                >
                  <ToggleButton value="today">Today</ToggleButton>
                  <ToggleButton value="week">This Week</ToggleButton>
                  <ToggleButton value="month">This Month</ToggleButton>
                  <ToggleButton value="all">All Time</ToggleButton>
                </ToggleButtonGroup>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Mood</InputLabel>
                  <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Mood"
                  >
                    <MenuItem value="all">All Moods</MenuItem>
                    {moodOptions.map((mood) => (
                      <MenuItem key={mood.value} value={mood.value}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {mood.icon}
                          {mood.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Tags</InputLabel>
                  <Select
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    label="Tags"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={value} 
                            size="small" 
                            onDelete={() => 
                              setSelectedTags(selectedTags.filter(tag => tag !== value))
                            }
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {tagOptions.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LabelIcon fontSize="small" />
                          {tag} ({tagCounts[tag] || 0})
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mood Summary */}
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Mood Summary
        </Typography>
        <Grid container spacing={2}>
          {moodStats.map((mood) => (
            <Grid item xs={6} sm={4} md={2.4} key={mood.value}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: `${mood.color}10`,
                  borderLeft: `4px solid ${mood.color}`,
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                  {React.cloneElement(mood.icon, { sx: { fontSize: 30 } })}
                </Box>
                <Typography variant="h6">{mood.count}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {mood.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Add/Edit Form */}
      {showForm && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date"
                      value={formData.date}
                      onChange={(date) => 
                        setFormData({ ...formData, date })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>How are you feeling?</InputLabel>
                    <Select
                      name="mood"
                      value={formData.mood}
                      onChange={handleInputChange}
                      label="How are you feeling?"
                    >
                      {moodOptions.map((mood) => (
                        <MenuItem key={mood.value} value={mood.value}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {mood.icon}
                            {mood.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Write your thoughts..."
                    name="content"
                    multiline
                    rows={6}
                    value={formData.content}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Tags</InputLabel>
                    <Select
                      multiple
                      name="tags"
                      value={formData.tags}
                      onChange={handleTagChange}
                      label="Tags"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {tagOptions.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {editingId ? 'Update' : 'Save'} Entry
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Journal Entries */}
      {filteredEntries.length > 0 ? (
        <Grid container spacing={3}>
          {filteredEntries.map((entry) => {
            const mood = moodOptions.find(m => m.value === entry.mood) || moodOptions[2];
            return (
              <Grid item xs={12} md={6} lg={4} key={entry.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: `4px solid ${getMoodColor(entry.mood)}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          color: getMoodColor(entry.mood),
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {getMoodIcon(entry.mood)}
                        {mood.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(entry.date), 'MMM d, yyyy')}
                      </Typography>
                    </Box>

                    <Typography variant="h6" component="h3" gutterBottom>
                      {entry.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        flexGrow: 1,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {entry.content}
                    </Typography>

                    {entry.tags && entry.tags.length > 0 && (
                      <Box sx={{ mt: 'auto', pt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {entry.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            icon={<LabelIcon fontSize="small" />}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      p: 1,
                      bgcolor: 'background.default',
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(entry)}
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => confirmDelete(entry)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          textAlign="center"
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            minHeight: 300,
          }}
        >
          <MoodIcon
            color="action"
            sx={{ fontSize: 60, mb: 2, opacity: 0.5 }}
          />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No journal entries found
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            {searchQuery || filter !== 'all' || selectedTags.length > 0
              ? 'Try adjusting your filters or search query.'
              : 'Start by writing your first journal entry!'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
          >
            New Entry
          </Button>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete Entry</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this journal entry? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JournalTracker;