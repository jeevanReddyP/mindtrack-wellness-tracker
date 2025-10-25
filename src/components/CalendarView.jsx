// src/components/CalendarView.js
import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isSameMonth, isToday } from 'date-fns';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  ChevronLeft as PreviousIcon,
  ChevronRight as NextIcon,
  Today as TodayIcon,
  Add as AddIcon,
  Event as EventIcon,
  FitnessCenter as ExerciseIcon,
  LocalDrink as WaterIcon,
  Book as JournalIcon,
  SelfImprovement as MeditationIcon,
} from '@mui/icons-material';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Morning Run',
      type: 'exercise',
      date: '2023-05-15',
      time: '07:00',
      duration: 30,
      completed: true,
    },
    {
      id: 2,
      title: 'Team Meeting',
      type: 'work',
      date: '2023-05-15',
      time: '14:00',
      duration: 60,
      completed: false,
    },
    {
      id: 3,
      title: 'Evening Meditation',
      type: 'meditation',
      date: '2023-05-15',
      time: '20:00',
      duration: 15,
      completed: false,
    },
    {
      id: 4,
      title: 'Gym Session',
      type: 'exercise',
      date: '2023-05-17',
      time: '18:00',
      duration: 60,
      completed: false,
    },
    {
      id: 5,
      title: 'Journaling',
      type: 'journal',
      date: '2023-05-17',
      time: '21:00',
      duration: 20,
      completed: false,
    },
  ]);

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const prevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {format(currentDate, dateFormat)}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<TodayIcon />}
            onClick={goToToday}
            size="small"
          >
            Today
          </Button>
        </Box>
        <Box>
          <IconButton onClick={prevWeek} size="small">
            <PreviousIcon />
          </IconButton>
          <IconButton onClick={nextWeek} size="small">
            <NextIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    let startDate = startOfWeek(currentDate, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <Box
          key={i}
          sx={{
            textAlign: 'center',
            p: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontWeight: 'bold',
          }}
        >
          {format(addDays(startDate, i), dateFormat)}
        </Box>
      );
    }

    return <Grid container>{days}</Grid>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;

    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const formattedDate = format(cloneDay, 'yyyy-MM-dd');
      const dayEvents = events.filter(event => event.date === formattedDate);
      
      days.push(
        <Grid item xs key={i} sx={{ minHeight: 120, borderRight: '1px solid', borderColor: 'divider' }}>
          <Box
            sx={{
              p: 1,
              minHeight: '100%',
              backgroundColor: isSameDay(cloneDay, selectedDate) ? 'action.selected' : 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isToday(cloneDay) ? 'bold' : 'normal',
                  color: isToday(cloneDay) ? 'primary.main' : 'text.primary',
                }}
              >
                {format(cloneDay, 'd')}
              </Typography>
              {dayEvents.length > 0 && (
                <Chip
                  label={dayEvents.length}
                  size="small"
                  color="primary"
                  sx={{ minWidth: 24, height: 20, fontSize: '0.7rem' }}
                />
              )}
            </Box>

            <Box sx={{ mt: 1 }}>
              {dayEvents.slice(0, 2).map((event) => (
                <Chip
                  key={event.id}
                  label={event.title}
                  size="small"
                  color={getEventColor(event.type)}
                  sx={{
                    display: 'block',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    mb: 0.5,
                    '& .MuiChip-label': {
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                />
              ))}
              {dayEvents.length > 2 && (
                <Typography variant="caption" color="text.secondary">
                  +{dayEvents.length - 2} more
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      );
      day = addDays(day, 1);
    }

    rows.push(
      <Grid container key={day.toString()}>
        {days}
      </Grid>
    );
    return rows;
  };

  const getEventColor = (type) => {
    const colors = {
      exercise: 'primary',
      work: 'secondary',
      meditation: 'success',
      journal: 'info',
      water: 'info',
      default: 'default',
    };
    return colors[type] || colors.default;
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'exercise':
        return <ExerciseIcon fontSize="small" />;
      case 'water':
        return <WaterIcon fontSize="small" />;
      case 'journal':
        return <JournalIcon fontSize="small" />;
      case 'meditation':
        return <MeditationIcon fontSize="small" />;
      default:
        return <EventIcon fontSize="small" />;
    }
  };

  const selectedDateEvents = events.filter(
    event => event.date === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Calendar
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              All Events
            </Typography>
            <List>
              {events.length > 0 ? (
                events
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => (
                    <React.Fragment key={event.id}>
                      <ListItem>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: `${getEventColor(event.type)}.light`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            color: `${getEventColor(event.type)}.dark`,
                          }}
                        >
                          {getEventIcon(event.type)}
                        </Box>
                        <ListItemText
                          primary={event.title}
                          secondary={`${format(new Date(`${event.date}T${event.time}`), 'h:mm a')} • ${event.duration} min`}
                        />
                        <Chip
                          label={event.completed ? 'Completed' : 'Upcoming'}
                          color={event.completed ? 'success' : 'default'}
                          size="small"
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <EventIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography>No events scheduled</Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </Typography>
              {isToday(selectedDate) && (
                <Chip
                  label="Today"
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
              )}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ mb: 2 }}
              >
                Add Event
              </Button>

              {selectedDateEvents.length > 0 ? (
                <List dense>
                  {selectedDateEvents.map((event) => (
                    <ListItem
                      key={event.id}
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: 'action.hover',
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 40,
                          borderRadius: 1,
                          backgroundColor: `${getEventColor(event.type)}.main`,
                          mr: 2,
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">{event.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.time} • {event.duration} min
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    backgroundColor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  <EventIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No events scheduled
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List dense>
                {events
                  .filter(event => new Date(`${event.date}T${event.time}`) > new Date())
                  .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
                  .slice(0, 3)
                  .map((event) => (
                    <React.Fragment key={event.id}>
                      <ListItem>
                        <Box
                          sx={{
                            width: 8,
                            height: 40,
                            borderRadius: 1,
                            backgroundColor: `${getEventColor(event.type)}.main`,
                            mr: 2,
                          }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2">{event.title}</Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(`${event.date}T${event.time}`), 'MMM d, h:mm a')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              •
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {event.duration} min
                            </Typography>
                          </Box>
                        </Box>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                {events.filter(event => new Date(`${event.date}T${event.time}`) > new Date()).length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
                    <Typography variant="body2">No upcoming events</Typography>
                  </Box>
                )}
              </List>
              <Button fullWidth sx={{ mt: 1 }}>View All Events</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarView;