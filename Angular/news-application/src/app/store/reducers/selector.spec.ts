import * as fromSelector from './selector';

const mockNewsList = [
    {
        'section': 'Briefing',
        'subsection': '',
        'title': 'Ronny Jackson, North Korea, ‘Roseanne’: Your Thursday Briefing',
        'abstract': 'Here’s what you need to know to start your day.',
        'url': 'some url',
        'byline': 'By CHRIS STANFORD',
        'item_type': 'Article',
        'updated_date': '2018-03-29T08:00:54-04:00',
        'created_date': '2018-03-29T05:38:10-04:00',
        'published_date': '2018-03-29T05:38:10-04:00',
        'material_type_facet': '',
        'kicker': '',
        'des_facet': [],
        'org_facet': [],
        'per_facet': [],
        'geo_facet': [],
        'multimedia': [
          {
            'url': 'some url',
            'format': 'Standard Thumbnail',
            'height': 75,
            'width': 75,
            'type': 'image',
            'subtype': 'photo',
            'caption': '',
            'copyright': ''
          },
          {
            'url': 'some url',
            'format': 'thumbLarge',
            'height': 150,
            'width': 150,
            'type': 'image',
            'subtype': 'photo',
            'caption': '',
            'copyright': ''
          },
          {
            'url': 'some url',
            'format': 'Normal',
            'height': 127,
            'width': 190,
            'type': 'image',
            'subtype': 'photo',
            'caption': '',
            'copyright': ''
          },
          {
            'url': 'some url',
            'format': 'mediumThreeByTwo210',
            'height': 140,
            'width': 210,
            'type': 'image',
            'subtype': 'photo',
            'caption': '',
            'copyright': ''
          },
          {
            'url': 'https://static01.nyt.com/images/2018/03/29/world/29USBriefing-Amcore/29USBriefing-Amcore-superJumbo-v2.jpg',
            'format': 'superJumbo',
            'height': 188,
            'width': 624,
            'type': 'image',
            'subtype': 'photo',
            'caption': '',
            'copyright': ''
          }
        ],
        'short_url': 'https://nyti.ms/2uCje7F'
    },
    {
        'section': 'N.Y. / Region',
        'subsection': '',
        'title': 'New York Today: Managing the Major Leagues',
        'abstract': 'Thursday: Our teams’ new leaders, jazz then and now, and a chat room on the subway.',
        'url': 'https://www.nytimes.com/2018/03/29/nyregion/new-york-today-yankees-mets-manager.html',
        'byline': 'By ALEXANDRA S. LEVINE',
        'item_type': 'Article',
        'updated_date': '2018-03-29T10:28:10-04:00',
        'created_date': '2018-03-29T06:00:05-04:00',
        'published_date': '2018-03-29T06:00:05-04:00',
        'material_type_facet': '',
        'kicker': '',
        'des_facet': [],
        'org_facet': [],
        'per_facet': [],
        'geo_facet': [
          'New York City'
        ],
        'multimedia': [
          {
            'url': 'https://static01.nyt.com/images/2018/03/29/nyregion/29nytoday1/29nytoday1-thumbStandard.jpg',
            'format': 'Standard Thumbnail',
            'height': 75,
            'width': 75,
            'type': 'image',
            'subtype': 'photo',
            'caption': 'Aaron Boone of the Yankees, left, and Mickey Callaway of the Mets.',
            'copyright': 'Lynne Sladky/Associated Press, Jasen Vinlove/USA Today Sports, via Reuters'
          },
          {
            'url': 'https://static01.nyt.com/images/2018/03/29/nyregion/29nytoday1/29nytoday1-thumbLarge.jpg',
            'format': 'thumbLarge',
            'height': 150,
            'width': 150,
            'type': 'image',
            'subtype': 'photo',
            'caption': 'Aaron Boone of the Yankees, left, and Mickey Callaway of the Mets.',
            'copyright': 'Lynne Sladky/Associated Press, Jasen Vinlove/USA Today Sports, via Reuters'
          },
          {
            'url': 'https://static01.nyt.com/images/2018/03/29/nyregion/29nytoday1/29nytoday1-articleInline.jpg',
            'format': 'Normal',
            'height': 126,
            'width': 190,
            'type': 'image',
            'subtype': 'photo',
            'caption': 'Aaron Boone of the Yankees, left, and Mickey Callaway of the Mets.',
            'copyright': 'Lynne Sladky/Associated Press, Jasen Vinlove/USA Today Sports, via Reuters'
          },
          {
            'url': 'https://static01.nyt.com/images/2018/03/29/nyregion/29nytoday1/29nytoday1-mediumThreeByTwo210.jpg',
            'format': 'mediumThreeByTwo210',
            'height': 140,
            'width': 210,
            'type': 'image',
            'subtype': 'photo',
            'caption': 'Aaron Boone of the Yankees, left, and Mickey Callaway of the Mets.',
            'copyright': 'Lynne Sladky/Associated Press, Jasen Vinlove/USA Today Sports, via Reuters'
          },
          {
            'url': 'https://static01.nyt.com/images/2018/03/29/nyregion/29nytoday1/29nytoday1-superJumbo.jpg',
            'format': 'superJumbo',
            'height': 1355,
            'width': 2048,
            'type': 'image',
            'subtype': 'photo',
            'caption': 'Aaron Boone of the Yankees, left, and Mickey Callaway of the Mets.',
            'copyright': 'Lynne Sladky/Associated Press, Jasen Vinlove/USA Today Sports, via Reuters'
          }
        ],
        'short_url': 'https://nyti.ms/2uvatMy'
      }
];
