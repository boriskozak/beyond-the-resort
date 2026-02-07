/* Itineraries mapped by trip ID */
const ITINERARIES = {
    'iceland': [
        { day: 1, title: 'Arrival & Safety Briefing', desc: 'Fly into Akureyri. Transfer to our hot spring base camp on the Troll Peninsula. Evening gear check, avalanche safety briefing, and welcome dinner featuring Icelandic lamb.' },
        { day: 2, title: 'Heli Orientation — Coastal Peaks', desc: 'First heli runs on moderate coastal peaks (3,000 ft vertical). Get dialed into the terrain and snow conditions. Afternoon soak in geothermal hot spring.' },
        { day: 3, title: 'Summit to Sea Descents', desc: 'Full day of helicopter-accessed skiing — 5,000-foot descents ending at the Arctic Ocean. 6–8 runs depending on conditions.' },
        { day: 4, title: 'Glacier & Volcano Terrain', desc: 'Fly over fractured glaciers to ski volcanic terrain. Lunch at a remote mountain hut. Evening northern lights watch.' },
        { day: 5, title: 'The Big Lines', desc: 'Guides open the steepest terrain based on conditions. Couloirs, spines, and wide-open glacier faces. Celebration dinner.' },
        { day: 6, title: 'Final Runs & Departure', desc: 'Morning heli session. Transfer to Akureyri for afternoon flights. Option to extend with a Golden Circle tour.' }
    ],
    'greenland': [
        { day: 1, title: 'Fly to Nuuk', desc: 'Arrive in Greenland\'s capital. Board the expedition vessel. Safety briefing and crew introductions.' },
        { day: 2, title: 'Sail the Davis Strait', desc: 'Sail north through iceberg-studded waters. Wildlife spotting and ski prep on deck.' },
        { day: 3, title: 'First Fjord Landing', desc: 'Zodiac ashore to skin up 1,200m peaks directly from sea level. First ski descent into an unnamed fjord.' },
        { day: 4, title: 'Deep Fjord Exploration', desc: 'Sail deeper into unmapped fjords. Two touring objectives with 1,500m vertical each.' },
        { day: 5, title: 'Ice Cap Edge', desc: 'Approach the Greenland Ice Cap. Tour along its edge with views stretching to infinity.' },
        { day: 6, title: 'Remote Peninsula', desc: 'Land on a remote peninsula for a full day of touring. No human tracks anywhere.' },
        { day: 7, title: 'Weather Flex Day', desc: 'Arctic weather contingency day. If clear, tackle the biggest objective of the trip.' },
        { day: 8, title: 'Final Descent & Sail South', desc: 'Morning ski session. Begin sailing back to Nuuk.' },
        { day: 9, title: 'Nuuk Culture Day', desc: 'Explore Nuuk\'s Inuit museum and local culture. Farewell dinner of muskox and arctic char.' },
        { day: 10, title: 'Departure', desc: 'Flights home from Nuuk.' }
    ],
    'svalbard': [
        { day: 1, title: 'Arrive Longyearbyen', desc: 'Fly to the world\'s northernmost town. Board the tall ship. Polar bear rifle training.' },
        { day: 2, title: 'Sail to Billefjorden', desc: 'Sail east. First ski tour on glaciated peaks with armed polar bear guard.' },
        { day: 3, title: 'Tempelfjorden Couloirs', desc: 'Zodiac to shore for steep couloir descents. 1,000m vertical to the frozen fjord.' },
        { day: 4, title: 'Glacier Traverse', desc: 'Full-day glacier traverse between peaks. Crevasse rescue practice. Sauna on the ship.' },
        { day: 5, title: 'Spitsbergen Interior', desc: 'Sail to the north coast. Ski remote alpine terrain with midnight sun (late season).' },
        { day: 6, title: 'North Coast Exploration', desc: 'Tour through polar desert landscapes. Wildlife: arctic fox, reindeer, seabirds.' },
        { day: 7, title: 'Final Summit', desc: 'Attempt the trip\'s highest peak. Gourmet farewell dinner aboard the ship.' },
        { day: 8, title: 'Sail Back & Departure', desc: 'Morning sail to Longyearbyen. Afternoon flights.' }
    ],
    'finland': [
        { day: 1, title: 'Arrive Finnish Lapland', desc: 'Fly to Ivalo. Transfer to wilderness cabin. Meet the husky team. Sauna and welcome dinner.' },
        { day: 2, title: 'Skin Through Boreal Forest', desc: 'First touring day through ancient pine forest. Dog sleds carry gear to the next cabin. Evening aurora watch.' },
        { day: 3, title: 'Frozen Lake Traverse', desc: 'Cross a vast frozen lake on skis. Lunch cooked over open fire. Arrive at a remote wilderness hut.' },
        { day: 4, title: 'Fell Summit Day', desc: 'Skin to the top of a Lappish fell. 360° views of arctic wilderness. Traditional Sámi dinner.' },
        { day: 5, title: 'Final Run & Departure', desc: 'Morning ski through birch glades. Dog sled ride back to base. Farewell sauna and transfer to Ivalo.' }
    ],
    'kyrgyzstan': [
        { day: 1, title: 'Arrive Bishkek', desc: 'Land in Kyrgyzstan\'s capital. Drive to the Tien Shan foothills. Set up in a traditional yurt camp.' },
        { day: 2, title: 'Heli Orientation', desc: 'First flights in the Soviet-era Mi-8. 3 runs on open glaciated terrain above 4,000m.' },
        { day: 3, title: 'Cold Smoke Powder', desc: 'Full heli day — 6–8 runs in ultra-dry continental powder. Fermented mare\'s milk by the fire.' },
        { day: 4, title: 'High Altitude Peaks', desc: 'Push to 4,500m+ peaks. Steep faces and wide glaciers. Yurt feast with local herders.' },
        { day: 5, title: 'Silk Road Culture', desc: 'Morning heli runs. Afternoon visit to Silk Road caravanserai and local bazaar.' },
        { day: 6, title: 'The Big Objective', desc: 'Weather-dependent attempt on the trip\'s biggest line. Evening celebration.' },
        { day: 7, title: 'Final Runs & Departure', desc: 'Morning session. Drive back to Bishkek. Farewell dinner downtown.' }
    ],
    'skijoring': [
        { day: 1, title: 'Arrive & Meet the Horses', desc: 'Check into the five-star lodge. Meet your horse. Introduction to skijoring technique on the practice course.' },
        { day: 2, title: 'Skijoring Fundamentals', desc: 'Morning instruction: turns, jumps, and speed control. Afternoon free runs on frozen meadows. Wagyu steak dinner.' },
        { day: 3, title: 'Competition Day', desc: 'Timed slalom and jump course. Guest vs. guest competition. Champagne podium ceremony.' },
        { day: 4, title: 'Backcountry Ride & Departure', desc: 'Morning horse-drawn ski through mountain trails. Farewell brunch. Transfers to airport.' }
    ],
    'kamchatka': [
        { day: 1, title: 'Arrive Petropavlovsk', desc: 'Fly to Kamchatka. Meet the team. Review volcano terrain maps and safety protocols.' },
        { day: 2, title: 'First Volcano Flight', desc: 'Mi-8 helicopter to Avachinsky volcano. Ski 2,000m descents through volcanic terrain.' },
        { day: 3, title: 'Mutnovsky Hot Springs', desc: 'Fly to Mutnovsky volcano. Ski between fumaroles. Soak in natural hot springs at the base.' },
        { day: 4, title: 'Koryaksky — The Big One', desc: 'Attempt Koryaksky volcano (3,456m). The steepest and most committing line of the trip.' },
        { day: 5, title: 'Coastal Range Touring', desc: 'Tour the coastal peaks. Ski to the Pacific Ocean shoreline. Brown bear spotting.' },
        { day: 6, title: 'Gorely Volcano', desc: 'Helicopter to Gorely. Ski the crater rim and descend through sulfur fields.' },
        { day: 7, title: 'Weather Flex / Culture', desc: 'Backup weather day or visit indigenous Itelmen village.' },
        { day: 8, title: 'Deep Interior', desc: 'Fly to remote interior volcanoes rarely visited. Virgin lines in complete isolation.' },
        { day: 9, title: 'Final Volcano & Celebration', desc: 'Last heli day. Evening seafood feast — king crab and caviar.' },
        { day: 10, title: 'Departure', desc: 'Transfer to Petropavlovsk airport. Flights to Moscow/connecting.' }
    ],
    'alaska-valdez': [
        { day: 1, title: 'Arrive Valdez', desc: 'Fly into Valdez, Alaska. Gear fitting, avalanche briefing, terrain review with guides.' },
        { day: 2, title: 'First Flights — Chugach Intro', desc: 'A-Star helicopter into the Chugach. 3–4 moderate runs to dial in conditions. 3,000 ft vertical.' },
        { day: 3, title: 'Thompson Pass Zone', desc: 'Full heli day in the Thompson Pass area. 6–8 runs on spines and open faces.' },
        { day: 4, title: 'Deep Chugach Penetration', desc: 'Fly deep into the range for 5,000-foot faces. The terrain that defined extreme skiing.' },
        { day: 5, title: 'Spine Skiing', desc: 'Conditions-dependent spine skiing on classic Valdez features. Photo/video opportunities.' },
        { day: 6, title: 'The Ultimate Line', desc: 'Guides select the trip\'s biggest objective. 5,000+ vertical feet of Alaskan spine.' },
        { day: 7, title: 'Final Session & Departure', desc: 'Morning heli runs. Farewell halibut dinner. Transfer to airport.' }
    ],
    'patagonia': [
        { day: 1, title: 'Arrive El Chaltén', desc: 'Fly to El Calafate, drive to El Chaltén. Welcome asado (BBQ) with Malbec.' },
        { day: 2, title: 'Approach Trek', desc: 'Trek into the Fitz Roy massif with pack mules. Set up base camp.' },
        { day: 3, title: 'First Ski Descent', desc: 'Skin up to a glacial col. First descent with Fitz Roy and Cerro Torre in view.' },
        { day: 4, title: 'Glacier Touring', desc: 'Full day on the Southern Patagonian Ice Field. Massive glaciated terrain.' },
        { day: 5, title: 'Storm Day / Rest', desc: 'Patagonian weather contingency. Camp rest or short tour depending on conditions.' },
        { day: 6, title: 'Lenga Forest Runs', desc: 'Tour and ski through ancient lenga beech forests. Descent to a remote lake.' },
        { day: 7, title: 'The Big Line', desc: 'Attempt the trip\'s marquee descent — 1,500m of continuous skiing.' },
        { day: 8, title: 'Boat Access Day', desc: 'Boat across glacial lake to access remote peaks on the far shore.' },
        { day: 9, title: 'Final Touring & Trek Out', desc: 'Morning tour. Pack out to El Chaltén. Celebration asado.' },
        { day: 10, title: 'Departure', desc: 'Drive to El Calafate. Optional Pedrido Moreno glacier visit. Flights home.' }
    ],
    'taos': [
        { day: 1, title: 'Arrive Taos', desc: 'Fly into Albuquerque, scenic drive through the Rio Grande Gorge to Taos Ski Valley. Check into The Blake. Welcome dinner with local green chile specialties.' },
        { day: 2, title: 'Kachina Peak & Expert Terrain', desc: 'Guided heli access to Kachina Peak\'s above-treeline chutes. Afternoon laps on Al\'s Run and Stauffenberg. Après at the Bavarian Lodge.' },
        { day: 3, title: 'Backcountry & Wheeler Peak', desc: 'Backcountry touring toward Wheeler Peak (New Mexico\'s highest at 4,011m). Packed lunch at treeline. Evening at a historic Taos Plaza restaurant.' },
        { day: 4, title: 'Pueblo Cultural Immersion', desc: 'Morning ski session. Afternoon visit to Taos Pueblo — a UNESCO World Heritage Site continuously inhabited for 1,000+ years. Traditional Pueblo bread baking demo.' },
        { day: 5, title: 'Final Runs & Departure', desc: 'Sunrise heli drop on untouched powder. Farewell brunch with huevos rancheros. Transfer to Albuquerque.' }
    ]
};

// Generate simple itineraries for trips that don't have custom ones
TRIPS.forEach(trip => {
    if (!ITINERARIES[trip.id]) {
        const numDays = parseInt(trip.details[0]) || 6;
        const itin = [];
        itin.push({ day: 1, title: 'Arrival & Orientation', desc: `Arrive in ${trip.region.split('—')[0].trim()}. Transfer to base. Safety briefing, gear check, and welcome dinner with the team.` });
        if (numDays >= 4) {
            itin.push({ day: 2, title: 'First Excursion', desc: `${trip.transport === 'helicopter' ? 'First heli flights on moderate terrain' : trip.transport === 'boat' ? 'Sail to the first objective' : trip.transport === 'dogsled' ? 'Set off with the dog sled team' : 'Begin the approach'}. Get acquainted with the ${trip.snowType.split('—')[0].trim()} snow conditions and local terrain.` });
            for (let d = 3; d <= numDays - 2; d++) {
                const activities = [
                    'Full day in the mountains. Push deeper into untouched terrain with your guides.',
                    'Explore a new zone. The best snow and most dramatic lines of the trip so far.',
                    'Weather-dependent objectives. Guides select terrain based on conditions and group ability.',
                    'Rest morning or cultural excursion. Afternoon session on fresh terrain.',
                    'The marquee day — attempt the trip\'s biggest and most committing line.'
                ];
                itin.push({ day: d, title: `Day ${d} — ${d === numDays - 2 ? 'The Big Objective' : 'Deep Exploration'}`, desc: activities[(d - 3) % activities.length] });
            }
            itin.push({ day: numDays - 1, title: 'Final Full Day', desc: 'Last full day of skiing. Guides open up the best remaining terrain. Farewell celebration dinner with the team.' });
        } else {
            for (let d = 2; d <= numDays - 1; d++) {
                itin.push({ day: d, title: `Day ${d} — Full ${trip.transport === 'helicopter' ? 'Heli' : 'Touring'} Session`, desc: 'Full day of guided skiing in the best available terrain. Return to base for evening relaxation.' });
            }
        }
        itin.push({ day: numDays, title: 'Departure', desc: `Final morning session (conditions permitting). Pack up and transfer to the nearest airport. Flights home.` });
        ITINERARIES[trip.id] = itin;
    }
});
