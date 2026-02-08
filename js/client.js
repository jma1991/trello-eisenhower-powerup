// Eisenhower Matrix Power-Up for Trello
console.log('Eisenhower Matrix Power-Up: Loading...');

// Quadrant definitions with colors
const QUADRANTS = {
  doIt: {
    name: 'Do It',
    color: 'green',
    icon: '🟢'
  },
  scheduleIt: {
    name: 'Schedule It',
    color: 'blue',
    icon: '🔵'
  },
  delegateIt: {
    name: 'Delegate It',
    color: 'yellow',
    icon: '🟡'
  },
  dontDoIt: {
    name: "Don't Do It",
    color: 'red',
    icon: '🔴'
  }
};

// Determine quadrant based on importance and urgency
function getQuadrant(importance, urgency) {
  if (importance === 'high' && urgency === 'high') return QUADRANTS.doIt;
  if (importance === 'high' && urgency === 'low') return QUADRANTS.scheduleIt;
  if (importance === 'low' && urgency === 'high') return QUADRANTS.delegateIt;
  if (importance === 'low' && urgency === 'low') return QUADRANTS.dontDoIt;
  return null;
}

// Base URL for the Power-Up
var POWER_UP_BASE_URL = 'https://jma1991.github.io/trello-eisenhower-powerup';

// Card Back Section - where users set Importance and Urgency
function cardBackSection(t) {
  console.log('Eisenhower Matrix: cardBackSection called');
  return {
    title: 'Eisenhower Matrix',
    icon: POWER_UP_BASE_URL + '/icon.svg',
    content: {
      type: 'iframe',
      url: t.signUrl(POWER_UP_BASE_URL + '/card-back.html'),
      height: 120
    }
  };
}

// Card Badges - show quadrant on card front
function cardBadges(t) {
  return t.get('card', 'shared', 'eisenhowerMatrix')
    .then(function(data) {
      if (!data || !data.importance || !data.urgency) {
        return [{
          text: 'Rate Importance/Urgency',
          color: 'light-gray'
        }];
      }

      const quadrant = getQuadrant(data.importance, data.urgency);
      if (!quadrant) return [];

      return [{
        text: quadrant.name,
        color: quadrant.color
      }];
    });
}

// Card Detail Badges - show more detail on card back
function cardDetailBadges(t) {
  return t.get('card', 'shared', 'eisenhowerMatrix')
    .then(function(data) {
      if (!data || !data.importance || !data.urgency) {
        return [];
      }

      const quadrant = getQuadrant(data.importance, data.urgency);
      if (!quadrant) return [];

      return [{
        title: 'Quadrant',
        text: quadrant.icon + ' ' + quadrant.name,
        color: quadrant.color
      }];
    });
}

// Initialize the Power-Up
console.log('Eisenhower Matrix: Initializing Power-Up...');
console.log('TrelloPowerUp available:', typeof TrelloPowerUp !== 'undefined');

try {
  TrelloPowerUp.initialize({
    'card-back-section': cardBackSection,
    'card-badges': cardBadges,
    'card-detail-badges': cardDetailBadges
  });
  console.log('Eisenhower Matrix: Power-Up initialized successfully');
} catch (e) {
  console.error('Eisenhower Matrix: Failed to initialize', e);
}
