// src/components/JournalTracker.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  Book as JournalIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  DateRange as DateIcon,
  Mood as MoodIcon,
  SentimentSatisfied as HappyIcon,
  SentimentNeutral as NeutralIcon,
  SentimentDissatisfied as SadIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const JournalTracker = () => {
  const [tabValue, setTabValue] = useState(0);
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'Great day!',
      content: 'Had a wonderful time with friends and family. Feeling grateful for everything.',
      date: '2023-05-15',
      mood: 'happy',
      tags: ['friends', 'family', 'gratitude'],
    },
    {
      id: 2,
      title: 'Productive day',
      content: 'Completed all my tasks and learned new things. Feeling accomplished!',
      date: '2023-05-14',
      mood: 'happy',
      tags: ['work', 'productivity'],
    },
  ]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '',
    tags: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEntry = () => {
    if (newEntry.title && newEntry.content) {
      setEntries(prev => [{
        id: Date.now(),
        ...newEntry,
        date: new Date().toISOString().split('T')[0]
      }, ...prev]);
      setNewEntry({ title: '', content: '', mood: '', tags: [] });
    }
  };

  const handleUpdateEntry = () => {
    if (currentEntry && currentEntry.title && currentEntry.content) {
      setEntries(prev => 
        prev.map(entry => 
          entry.id === currentEntry.id ? currentEntry : entry
        )
      );
      setIsEditing(false);
      setCurrentEntry(null);
    }
  };

  const handleEditEntry = (entry) => {
    setCurrentEntry(entry);
    setIsEditing(true);
  };

  const handleDeleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy':
        return <HappyIcon color="success" />;
      case 'neutral':
        return <NeutralIcon color="warning" />;
      case 'sad':
        return <SadIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <JournalIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Journal
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => {
            setIsEditing(false);
            setCurrentEntry(null);
            setNewEntry({ title: '', content: '', mood: '', tags: [] });
          }}
        >
          New Entry
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="journal tabs"
              sx={{ mb: 3 }}
            >
              <Tab label="All Entries" />
              <Tab label="Favorites" />
              <Tab label="By Mood" />
            </Tabs>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Search entries..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
              <Button variant="outlined" startIcon={<FilterIcon />}>
                Filters
              </Button>
            </Box>

            <List>
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <React.Fragment key={entry.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getMoodIcon(entry.mood)}
                            <Typography variant="subtitle1" component="span">
                              {entry.title}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {entry.content.length > 150 
                                ? `${entry.content.substring(0, 150)}...` 
                                : entry.content}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                              <Chip
                                icon={<DateIcon fontSize="small" />}
                                label={new Date(entry.date).toLocaleDateString()}
                                size="small"
                                variant="outlined"
                              />
                              {entry.tags.map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="edit"
                          onClick={() => handleEditEntry(entry)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteEntry(entry.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <JournalIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography>No journal entries found</Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {isEditing ? 'Edit Entry' : 'New Entry'}
              </Typography>
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={isEditing && currentEntry ? new Date(currentEntry.date) : new Date()}
                  onChange={(date) => {
                    if (isEditing && currentEntry) {
                      setCurrentEntry(prev => ({
                        ...prev,
                        date: date.toISOString().split('T')[0]
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      sx={{ mb: 2 }}
                      disabled={!isEditing}
                    />
                  )}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                label="Title"
                name="title"
                value={isEditing && currentEntry ? currentEntry.title : newEntry.title}
                onChange={(e) => {
                  if (isEditing && currentEntry) {
                    setCurrentEntry(prev => ({
                      ...prev,
                      title: e.target.value
                    }));
                  } else {
                    handleInputChange(e);
                  }
                }}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="How are you feeling today?"
                name="content"
                multiline
                rows={6}
                value={isEditing && currentEntry ? currentEntry.content : newEntry.content}
                onChange={(e) => {
                  if (isEditing && currentEntry) {
                    setCurrentEntry(prev => ({
                      ...prev,
                      content: e.target.value
                    }));
                  } else {
                    handleInputChange(e);
                  }
                }}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Mood
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['happy', 'neutral', 'sad'].map((mood) => (
                    <Button
                      key={mood}
                      variant={
                        (isEditing && currentEntry && currentEntry.mood === mood) || 
                        (!isEditing && newEntry.mood === mood)
                          ? 'contained' 
                          : 'outlined'
                      }
                      onClick={() => {
                        if (isEditing && currentEntry) {
                          setCurrentEntry(prev => ({
                            ...prev,
                            mood
                          }));
                        } else {
                          setNewEntry(prev => ({
                            ...prev,
                            mood
                          }));
                        }
                      }}
                      startIcon={getMoodIcon(mood)}
                      size="small"
                    >
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </Button>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {(isEditing && currentEntry
                    ? currentEntry.tags
                    : newEntry.tags
                  ).map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => {
                        if (isEditing && currentEntry) {
                          setCurrentEntry(prev => ({
                            ...prev,
                            tags: prev.tags.filter((_, i) => i !== index)
                          }));
                        } else {
                          setNewEntry(prev => ({
                            ...prev,
                            tags: prev.tags.filter((_, i) => i !== index)
                          }));
                        }
                      }}
                      size="small"
                    />
                  ))}
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a tag and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      const newTag = e.target.value.trim();
                      if (isEditing && currentEntry) {
                        if (!currentEntry.tags.includes(newTag)) {
                          setCurrentEntry(prev => ({
                            ...prev,
                            tags: [...prev.tags, newTag]
                          }));
                        }
                      } else {
                        if (!newEntry.tags.includes(newTag)) {
                          setNewEntry(prev => ({
                            ...prev,
                            tags: [...prev.tags, newTag]
                          }));
                        }
                      }
                      e.target.value = '';
                    }
                  }}
                />
              </Box>

              {isEditing ? (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleUpdateEntry}
                  disabled={!currentEntry?.title || !currentEntry?.content}
                >
                  Update Entry
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddEntry}
                  disabled={!newEntry.title || !newEntry.content}
                >
                  Add Entry
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Writing Prompts
              </Typography>
              <List>
                {[
                  'What are you grateful for today?',
                  'What was the highlight of your day?',
                  'What challenges did you face today?',
                  'What did you learn today?',
                  'What are your goals for tomorrow?',
                ].map((prompt, index) => (
                  <ListItem 
                    key={index} 
                    button
                    onClick={() => {
                      if (isEditing && currentEntry) {
                        setCurrentEntry(prev => ({
                          ...prev,
                          content: prev.content ? `${prev.content}\n\n${prompt}` : prompt
                        }));
                      } else {
                        setNewEntry(prev => ({
                          ...prev,
                          content: prev.content ? `${prev.content}\n\n${prompt}` : prompt
                        }));
                      }
                    }}
                  >
                    <ListItemText 
                      primary={prompt} 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JournalTracker;