import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MOVIES = [
  // ── HOLLYWOOD ──
  { id: 1,  title: "Inception",                year: 2010, genre: ["Sci-Fi","Thriller"],         rating: 8.8, director: "Christopher Nolan",      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", accent: "#e8b04b", region: "Hollywood" },
  { id: 2,  title: "The Godfather",            year: 1972, genre: ["Crime","Drama"],             rating: 9.2, director: "Francis Ford Coppola",    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg", accent: "#c0392b", region: "Hollywood" },
  { id: 3,  title: "Interstellar",             year: 2014, genre: ["Sci-Fi","Adventure"],        rating: 8.6, director: "Christopher Nolan",      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", accent: "#2980b9", region: "Hollywood" },
  { id: 4,  title: "The Dark Knight",          year: 2008, genre: ["Action","Thriller"],         rating: 9.0, director: "Christopher Nolan",      description: "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy while testing Batman's moral limits.", poster: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_knight.jpg", accent: "#8e44ad", region: "Hollywood" },
  { id: 5,  title: "Pulp Fiction",             year: 1994, genre: ["Crime","Drama"],             rating: 8.9, director: "Quentin Tarantino",      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.", poster: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg", accent: "#e67e22", region: "Hollywood" },
  { id: 6,  title: "The Shawshank Redemption", year: 1994, genre: ["Drama"],                    rating: 9.3, director: "Frank Darabont",          description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", poster: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg", accent: "#95a5a6", region: "Hollywood" },
  { id: 7,  title: "Dune",                     year: 2021, genre: ["Sci-Fi","Adventure"],        rating: 8.0, director: "Denis Villeneuve",        description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions.", poster: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg", accent: "#d4a017", region: "Hollywood" },
  { id: 8,  title: "La La Land",               year: 2016, genre: ["Romance","Musical"],        rating: 8.0, director: "Damien Chazelle",         description: "A pianist and an actress fall in love in Los Angeles, navigating ambition, dreams and heartbreak in a modern musical.", poster: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png", accent: "#9b59b6", region: "Hollywood" },
  { id: 9,  title: "Get Out",                  year: 2017, genre: ["Horror","Thriller"],         rating: 7.7, director: "Jordan Peele",            description: "A young African-American visits his white girlfriend's parents where his uneasiness grows into a terrifying ordeal.", poster: "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_film_poster.png", accent: "#e74c3c", region: "Hollywood" },
  { id: 10, title: "Mad Max: Fury Road",        year: 2015, genre: ["Action","Sci-Fi"],           rating: 8.1, director: "George Miller",           description: "In a post-apocalyptic wasteland, Max teams with a rebellious warrior to flee a cult leader in a deadly high-speed chase.", poster: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg", accent: "#e74c3c", region: "Hollywood" },
  { id: 11, title: "Parasite",                 year: 2019, genre: ["Thriller","Drama"],          rating: 8.5, director: "Bong Joon-ho",            description: "Greed and class discrimination threaten the symbiotic relationship between a wealthy family and a destitute clan.", poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png", accent: "#27ae60", region: "Hollywood" },
  { id: 12, title: "Joker",                    year: 2019, genre: ["Crime","Drama","Thriller"],  rating: 8.4, director: "Todd Phillips",           description: "A failed comedian descends into madness and becomes the iconic criminal Joker in a gritty, character-driven origin story.", poster: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg", accent: "#e67e22", region: "Hollywood" },
  { id: 13, title: "Gladiator",                year: 2000, genre: ["Action","Historical"],       rating: 8.5, director: "Ridley Scott",            description: "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and enslaved him.", poster: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png", accent: "#c0392b", region: "Hollywood" },
  { id: 14, title: "The Matrix",               year: 1999, genre: ["Sci-Fi","Action"],           rating: 8.7, director: "The Wachowskis",          description: "A computer hacker discovers the world he lives in is a simulated reality, and joins a rebellion to free humanity.", poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", accent: "#39d353", region: "Hollywood" },
  { id: 15, title: "Forrest Gump",             year: 1994, genre: ["Drama","Comedy"],            rating: 8.8, director: "Robert Zemeckis",         description: "The life story of an Alabama man with a low IQ who witnesses and influences many defining historical events.", poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", accent: "#3498db", region: "Hollywood" },
  { id: 16, title: "The Silence of the Lambs", year: 1991, genre: ["Horror","Thriller","Crime"], rating: 8.6, director: "Jonathan Demme",          description: "A young FBI cadet must confide in an incarcerated cannibal killer to catch another serial killer terrorising the country.", poster: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg", accent: "#2ecc71", region: "Hollywood" },
  { id: 17, title: "Schindler's List",         year: 1993, genre: ["Historical","Drama","War"],  rating: 9.0, director: "Steven Spielberg",        description: "A German businessman saves the lives of more than a thousand Jewish refugees during the Holocaust.", poster: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg", accent: "#bdc3c7", region: "Hollywood" },
  { id: 18, title: "Avengers: Endgame",        year: 2019, genre: ["Action","Fantasy","Sci-Fi"],  rating: 8.4, director: "Russo Brothers",          description: "The Avengers assemble once more to reverse the devastation caused by Thanos using time travel and heroic sacrifice.", poster: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", accent: "#e74c3c", region: "Hollywood" },
  { id: 19, title: "Whiplash",                 year: 2014, genre: ["Drama","Music"],             rating: 8.5, director: "Damien Chazelle",         description: "A promising young drummer enrolls at a cutthroat music conservatory where his dreams are challenged by an obsessive instructor.", poster: "https://upload.wikimedia.org/wikipedia/en/4/41/Whiplash_%28film%29_poster.jpg", accent: "#f39c12", region: "Hollywood" },
  { id: 20, title: "The Truman Show",          year: 1998, genre: ["Drama","Comedy","Sci-Fi"],    rating: 8.2, director: "Peter Weir",              description: "A man discovers his entire life is a reality TV show — his town, his friends, and even his wife all part of the act.", poster: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Truman_Show_film_poster.jpg", accent: "#2980b9", region: "Hollywood" },
  // ── BOLLYWOOD ──
  { id: 21, title: "3 Idiots",                 year: 2009, genre: ["Comedy","Drama"],            rating: 8.4, director: "Rajkumar Hirani",         description: "Two friends search for their lost companion while reliving their hilarious and moving college days at a top engineering institute.", poster: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg", accent: "#3498db", region: "Bollywood" },
  { id: 22, title: "Dangal",                   year: 2016, genre: ["Drama","Sports"],            rating: 8.3, director: "Nitesh Tiwari",           description: "Former wrestler Mahavir Singh Phogat trains his daughters to become world-class wrestlers, defying all social norms in rural India.", poster: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg", accent: "#e67e22", region: "Bollywood" },
  { id: 23, title: "Lagaan",                   year: 2001, genre: ["Drama","Sports","Musical"],  rating: 8.1, director: "Ashutosh Gowariker",      description: "A small village in Victorian India challenges their British rulers to a game of cricket to avoid paying oppressive taxes.", poster: "https://upload.wikimedia.org/wikipedia/en/4/41/Lagaan_poster.jpg", accent: "#f39c12", region: "Bollywood" },
  { id: 24, title: "Gully Boy",                year: 2019, genre: ["Drama","Music"],             rating: 7.9, director: "Zoya Akhtar",             description: "A street rapper from the Dharavi slums of Mumbai fights against all odds to make his mark in the underground rap scene.", poster: "https://upload.wikimedia.org/wikipedia/en/7/seventh/Gully_Boy_poster.jpg", accent: "#ff5722", region: "Bollywood" },
  { id: 25, title: "Dil Chahta Hai",           year: 2001, genre: ["Comedy","Romance"],          rating: 8.1, director: "Farhan Akhtar",           description: "Three inseparable childhood friends take different paths as they grow up — one falls in love, one is a hopeless romantic, one wary of relationships.", poster: "https://upload.wikimedia.org/wikipedia/en/4/forty-three/Dil_Chahta_Hai_poster.jpg", accent: "#1abc9c", region: "Bollywood" },
  { id: 26, title: "PK",                       year: 2014, genre: ["Comedy","Drama"],            rating: 8.1, director: "Rajkumar Hirani",         description: "An alien on Earth loses the device he needs to contact his spaceship. Befriending a journalist, they challenge religious exploitation.", poster: "https://upload.wikimedia.org/wikipedia/en/f/f1/PK_2014_Hindi_Film.png", accent: "#9b59b6", region: "Bollywood" },
  { id: 27, title: "Queen",                    year: 2014, genre: ["Drama","Adventure"],         rating: 8.1, director: "Vikas Bahl",              description: "A Delhi girl goes on her honeymoon alone after her fiancé calls off their wedding, embarking on a journey of self-discovery.", poster: "https://upload.wikimedia.org/wikipedia/en/7/72/Queen_2014_Hindi_Film_Poster.jpg", accent: "#e91e63", region: "Bollywood" },
  { id: 28, title: "Kabhi Khushi Kabhie Gham", year: 2001, genre: ["Romance","Drama","Musical"], rating: 7.4, director: "Karan Johar",             description: "Rahul marries against his father's wishes and is disowned. Years later, his younger brother tries to reunite the family.", poster: "https://upload.wikimedia.org/wikipedia/en/0/09/Kabhikhushikabhiegham.jpg", accent: "#e91e8c", region: "Bollywood" },
  { id: 29, title: "Andhadhun",                year: 2018, genre: ["Thriller","Crime","Comedy"], rating: 8.2, director: "Sriram Raghavan",         description: "A partially blind pianist accidentally becomes a witness to a murder and is subsequently embroiled in a web of deceit.", poster: "https://upload.wikimedia.org/wikipedia/en/1/1d/Andhadhun_poster.jpg", accent: "#2c3e50", region: "Bollywood" },
  { id: 30, title: "Taare Zameen Par",         year: 2007, genre: ["Drama","Family"],            rating: 8.4, director: "Aamir Khan",              description: "An 8-year-old boy is thought to be lazy but is actually dyslexic, until an art teacher takes notice and helps him unlock his potential.", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Taare_Zameen_Par_poster.jpg/220px-Taare_Zameen_Par_poster.jpg", accent: "#f39c12", region: "Bollywood" },
  // ── RACING ──
  { id: 31, title: "F1",                       year: 2025, genre: ["Racing","Action"],           rating: 7.9, director: "Joseph Kosinski",         description: "A retired Formula One driver returns to the grid to mentor a young teammate while chasing one last shot at glory.", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/F1_The_Movie_poster.jpg/220px-F1_The_Movie_poster.jpg", accent: "#e8000d", region: "Racing" },
  { id: 32, title: "Rush",                     year: 2013, genre: ["Racing","Drama"],            rating: 8.1, director: "Ron Howard",              description: "The intense rivalry between Formula One rivals James Hunt and Niki Lauda during the legendary 1976 World Championship season.", poster: "https://upload.wikimedia.org/wikipedia/en/0/05/Rush_poster.jpg", accent: "#ff6b00", region: "Racing" },
  { id: 33, title: "Ford v Ferrari",           year: 2019, genre: ["Racing","Drama","Historical"],rating: 8.1, director: "James Mangold",           description: "Carroll Shelby and driver Ken Miles battle corporate interference to build a revolutionary race car for Ford at Le Mans 1966.", poster: "https://upload.wikimedia.org/wikipedia/en/a/ac/Ford_v_Ferrari_film_poster.jpg", accent: "#0066cc", region: "Racing" },
  { id: 34, title: "Senna",                    year: 2010, genre: ["Racing","Documentary"],      rating: 8.4, director: "Asif Kapadia",            description: "A documentary portrait of Brazilian Formula One legend Ayrton Senna — his genius, his rivalries, and his tragic death.", poster: "https://upload.wikimedia.org/wikipedia/en/d/d3/Senna_film.jpg", accent: "#009c3b", region: "Racing" },
  { id: 35, title: "Le Mans '66",              year: 2019, genre: ["Racing","Drama"],            rating: 8.1, director: "James Mangold",           description: "Two men who attempt to build the perfect race car challenge Ferrari's dominance at the 1966 24 Hours of Le Mans.", poster: "https://upload.wikimedia.org/wikipedia/en/a/ac/Ford_v_Ferrari_film_poster.jpg", accent: "#c0392b", region: "Racing" },
  { id: 36, title: "Speed Racer",              year: 2008, genre: ["Racing","Action","Fantasy"],  rating: 6.1, director: "The Wachowskis",          description: "A young driver aims to follow in his brother's footsteps and overcome the shadowy forces that control the racing world.", poster: "https://upload.wikimedia.org/wikipedia/en/4/41/Speed_racer_film_poster.jpg", accent: "#ff00aa", region: "Racing" },
  // ── WORLD CINEMA ──
  { id: 37, title: "Spirited Away",            year: 2001, genre: ["Animation","Fantasy","Adventure"], rating: 8.6, director: "Hayao Miyazaki",    description: "During her family's move, a 10-year-old girl wanders into a world ruled by gods, witches, and spirits and must find a way back.", poster: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png", accent: "#16a085", region: "World Cinema" },
  { id: 38, title: "Amélie",                   year: 2001, genre: ["Romance","Comedy","Fantasy"], rating: 8.3, director: "Jean-Pierre Jeunet",     description: "A shy waitress in Paris decides to change the lives of those around her for the better while struggling with her own isolation.", poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg", accent: "#e8b04b", region: "World Cinema" },
  { id: 39, title: "City of God",              year: 2002, genre: ["Crime","Drama"],             rating: 8.6, director: "Fernando Meirelles",      description: "Two boys grow up in a brutal crime-infested favela in Rio de Janeiro — one becomes a photographer, one a drug lord.", poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/CidadedeDeus.jpg", accent: "#e67e22", region: "World Cinema" },
  { id: 40, title: "Oldboy",                   year: 2003, genre: ["Thriller","Mystery","Action"],rating: 8.1, director: "Park Chan-wook",          description: "After being imprisoned for 15 years without reason, a man is suddenly released and has only five days to find his captor.", poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Old_Boy_2003.jpg", accent: "#c0392b", region: "World Cinema" },
  // ── ANIMATION ──
  { id: 41, title: "The Lion King",            year: 1994, genre: ["Animation","Drama","Musical"],rating: 8.5, director: "Roger Allers",            description: "A young lion prince flees his kingdom after the murder of his father and must return to face his past and claim his destiny.", poster: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg", accent: "#f39c12", region: "Animation" },
  { id: 42, title: "Up",                       year: 2009, genre: ["Animation","Adventure","Comedy"], rating: 8.2, director: "Pete Docter",        description: "A 78-year-old man fulfils his life dream of exploration by tying thousands of balloons to his house, with a young stowaway aboard.", poster: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg", accent: "#3498db", region: "Animation" },
  { id: 43, title: "WALL·E",                   year: 2008, genre: ["Animation","Sci-Fi","Romance"],rating: 8.4, director: "Andrew Stanton",        description: "A small waste-collecting robot inadvertently embarks on a space journey that decides the fate of mankind.", poster: "https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg", accent: "#2980b9", region: "Animation" },
  { id: 44, title: "Your Name",                year: 2016, genre: ["Animation","Romance","Fantasy"],rating: 8.4, director: "Makoto Shinkai",        description: "Two strangers find themselves linked in a bizarre way — a high school boy in Tokyo and a girl in rural Japan begin to swap bodies.", poster: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png", accent: "#e91e63", region: "Animation" },
  { id: 45, title: "Toy Story",                year: 1995, genre: ["Animation","Adventure","Comedy"], rating: 8.3, director: "John Lasseter",      description: "A cowboy doll is threatened when his owner gets a new spaceman figure as a birthday present and must find his place in the world.", poster: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg", accent: "#27ae60", region: "Animation" },
  // ── DOCUMENTARY ──
  { id: 46, title: "Free Solo",                year: 2018, genre: ["Documentary","Adventure"],    rating: 8.2, director: "Elizabeth Chai Vasarhelyi", description: "Rock climber Alex Honnold attempts to be the first person to ever free solo climb El Capitan in Yosemite National Park.", poster: "https://upload.wikimedia.org/wikipedia/en/e/e4/Free_Solo_film_poster.jpg", accent: "#e67e22", region: "Documentary" },
  { id: 47, title: "Won't You Be My Neighbor?",year: 2018, genre: ["Documentary","Family"],       rating: 8.4, director: "Morgan Neville",          description: "An intimate look at America's beloved neighbour, Fred Rogers, and the legacy of his children's TV show Mister Rogers' Neighborhood.", poster: "https://upload.wikimedia.org/wikipedia/en/b/b7/Won%27t_You_Be_My_Neighbor%3F_poster.jpg", accent: "#e8b04b", region: "Documentary" },
  { id: 48, title: "13th",                     year: 2016, genre: ["Documentary"],               rating: 8.2, director: "Ava DuVernay",            description: "An in-depth look at the US prison system and the racial inequality within, through the lens of the 13th Amendment.", poster: "https://upload.wikimedia.org/wikipedia/en/4/49/13th_%28film%29.png", accent: "#2c3e50", region: "Documentary" },
  // ── HORROR ──
  { id: 49, title: "Hereditary",               year: 2018, genre: ["Horror","Thriller","Mystery"],rating: 7.3, director: "Ari Aster",              description: "After the matriarch of the Graham family passes away, her daughter and family begin to unravel cryptic and terrifying secrets.", poster: "https://upload.wikimedia.org/wikipedia/en/d/d2/Hereditary_%28film%29.png", accent: "#8e44ad", region: "Hollywood" },
  { id: 50, title: "A Quiet Place",            year: 2018, genre: ["Horror","Sci-Fi","Thriller"], rating: 7.5, director: "John Krasinski",          description: "A family struggles to survive in a post-apocalyptic world populated by blind monsters with an acute sense of hearing.", poster: "https://upload.wikimedia.org/wikipedia/en/5/54/A_Quiet_Place_film_poster.jpg", accent: "#27ae60", region: "Hollywood" },
  // ── R-RATED ACTION ──
  { id: 51, title: "Mortal Kombat",            year: 2021, genre: ["Action","Fantasy","R-Rated"],  rating: 6.1, director: "Simon McQuoid",          description: "MMA fighter Cole Young seeks out Earth's greatest champions to stand against the defenders of Outworld in a high-stakes tournament.", poster: "https://upload.wikimedia.org/wikipedia/en/4/48/Mortal_Kombat_2021_film_poster.jpg", accent: "#e8000d", region: "Hollywood", type: "Movie" },
  { id: 52, title: "John Wick",                year: 2014, genre: ["Action","Thriller","R-Rated"], rating: 7.4, director: "Chad Stahelski",          description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog, a last gift from his recently deceased wife.", poster: "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg", accent: "#c0a060", region: "Hollywood", type: "Movie" },
  { id: 53, title: "John Wick: Chapter 4",     year: 2023, genre: ["Action","Thriller","R-Rated"], rating: 7.7, director: "Chad Stahelski",          description: "John Wick uncovers a path to defeating the High Table, but before he can earn his freedom he must face a new enemy with powerful alliances.", poster: "https://upload.wikimedia.org/wikipedia/en/2/22/John_Wick_Chapter_4_poster.jpg", accent: "#d4a017", region: "Hollywood", type: "Movie" },
  { id: 54, title: "Deadpool & Wolverine",     year: 2024, genre: ["Action","Comedy","R-Rated"],   rating: 7.7, director: "Shawn Levy",              description: "Deadpool is recruited by the Time Variance Authority and teams up with a reluctant Wolverine to save the multiverse.", poster: "https://upload.wikimedia.org/wikipedia/en/7/7b/Deadpool_%26_Wolverine_poster.jpg", accent: "#e8000d", region: "Hollywood", type: "Movie" },
  { id: 55, title: "The Raid",                 year: 2011, genre: ["Action","Thriller","R-Rated"], rating: 7.6, director: "Gareth Evans",            description: "A SWAT team becomes trapped in a tenement run by a ruthless mobster and his army of killers and thugs.", poster: "https://upload.wikimedia.org/wikipedia/en/b/b7/The_Raid_2011_film_poster.jpg", accent: "#e74c3c", region: "World Cinema", type: "Movie" },
  { id: 56, title: "Kill Bill: Vol. 1",        year: 2003, genre: ["Action","Crime","R-Rated"],    rating: 8.1, director: "Quentin Tarantino",      description: "After awakening from a four-year coma, a former assassin seeks revenge on the team of killers who betrayed her.", poster: "https://upload.wikimedia.org/wikipedia/en/3/38/Kill_Bill%27s_Volume_1_poster.jpg", accent: "#f5c518", region: "Hollywood", type: "Movie" },
  { id: 57, title: "300",                      year: 2006, genre: ["Action","Historical","R-Rated"],rating: 7.6, director: "Zack Snyder",            description: "King Leonidas of Sparta and a force of 300 men fight the Persian army at the Battle of Thermopylae.", poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/300poster.jpg", accent: "#c0392b", region: "Hollywood", type: "Movie" },
  { id: 58, title: "Mad Max: Fury Road",        year: 2015, genre: ["Action","Sci-Fi","R-Rated"],   rating: 8.1, director: "George Miller",           description: "In a post-apocalyptic wasteland, Max teams with a rebellious warrior to flee a cult leader and his army in a deadly high-speed chase.", poster: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg", accent: "#e74c3c", region: "Hollywood", type: "Movie" },
  // ── OTT SERIES ──
  { id: 59, title: "Breaking Bad",             year: 2008, genre: ["Crime","Drama","Thriller"],    rating: 9.5, director: "Vince Gilligan",          description: "A high school chemistry teacher diagnosed with terminal cancer teams with a former student to manufacture and sell crystal meth.", poster: "https://upload.wikimedia.org/wikipedia/en/6/61/Breaking_Bad_title_card.png", accent: "#27ae60", region: "OTT Series", type: "Series" },
  { id: 60, title: "Money Heist",              year: 2017, genre: ["Crime","Drama","Thriller"],    rating: 8.2, director: "Álex Pina",               description: "A mastermind criminal recruits eight thieves to pull off the biggest heist in history — taking hostages and barricading themselves in the Royal Mint.", poster: "https://upload.wikimedia.org/wikipedia/en/b/bf/La_casa_de_papel_Netflix_poster.jpg", accent: "#e8000d", region: "OTT Series", type: "Series" },
  { id: 61, title: "Stranger Things",          year: 2016, genre: ["Sci-Fi","Horror","Drama"],     rating: 8.7, director: "The Duffer Brothers",     description: "When a boy disappears in Hawkins, Indiana, his friends and family uncover a government conspiracy and supernatural forces in the 1980s.", poster: "https://upload.wikimedia.org/wikipedia/en/5/5e/Stranger_Things_season_1_poster.jpg", accent: "#e74c3c", region: "OTT Series", type: "Series" },
  { id: 62, title: "Game of Thrones",          year: 2011, genre: ["Fantasy","Drama","Action"],    rating: 9.2, director: "David Benioff & D.B. Weiss",description: "Noble families vie for control of the Iron Throne while an ancient enemy awakens beyond the Wall in a world of magic and brutality.", poster: "https://upload.wikimedia.org/wikipedia/en/d/d8/Game_of_Thrones_Season_3.jpg", accent: "#c9a96e", region: "OTT Series", type: "Series" },
  { id: 63, title: "The Witcher",              year: 2019, genre: ["Fantasy","Action","Adventure"],rating: 8.2, director: "Lauren Schmidt Hissrich", description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", poster: "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Witcher_Season_1_poster.jpg", accent: "#bdc3c7", region: "OTT Series", type: "Series" },
  { id: 64, title: "Dark",                     year: 2017, genre: ["Sci-Fi","Thriller","Mystery"], rating: 8.8, director: "Baran bo Odar",           description: "A family saga with a supernatural twist set in a German town where the disappearance of children exposes the double lives of four families.", poster: "https://upload.wikimedia.org/wikipedia/en/d/d5/Dark_Netflix_series_poster.jpg", accent: "#8e44ad", region: "OTT Series", type: "Series" },
  { id: 65, title: "Squid Game",               year: 2021, genre: ["Thriller","Drama","Action"],   rating: 8.0, director: "Hwang Dong-hyuk",         description: "Hundreds of cash-strapped contestants compete in deadly children's games for a tempting prize, with shocking and bloody results.", poster: "https://upload.wikimedia.org/wikipedia/en/9/9a/Squid_Game.png", accent: "#e8000d", region: "OTT Series", type: "Series" },
  { id: 66, title: "The Crown",                year: 2016, genre: ["Drama","Historical"],          rating: 8.6, director: "Peter Morgan",            description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.", poster: "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Crown_Season1_poster.jpg", accent: "#c9a96e", region: "OTT Series", type: "Series" },
  { id: 67, title: "Peaky Blinders",           year: 2013, genre: ["Crime","Drama","Historical"],  rating: 8.8, director: "Steven Knight",           description: "A gangster family epic set in 1920s Birmingham, England — the Shelby family rise to power through violence, cunning and ambition.", poster: "https://upload.wikimedia.org/wikipedia/en/7/7f/Peaky_Blinders_Series_5_poster.jpg", accent: "#2c3e50", region: "OTT Series", type: "Series" },
  { id: 68, title: "The Last of Us",           year: 2023, genre: ["Drama","Horror","Sci-Fi"],     rating: 8.8, director: "Craig Mazin",             description: "Joel, a hardened survivor, is hired to smuggle 14-year-old Ellie out of a quarantine zone — a journey that changes them both forever.", poster: "https://upload.wikimedia.org/wikipedia/en/1/1a/The_Last_of_Us_HBO_TV_series.jpg", accent: "#27ae60", region: "OTT Series", type: "Series" },
  { id: 69, title: "Mirzapur",                 year: 2018, genre: ["Crime","Drama","Action"],      rating: 8.4, director: "Karan Anshuman",          description: "The iron-fisted Tripathi family rules the Mirzapur region with crime and guns — two brothers get entangled in their brutal world of power.", poster: "https://upload.wikimedia.org/wikipedia/en/3/35/Mirzapur_-_Web_Series_Poster.jpg", accent: "#e67e22", region: "OTT Series", type: "Series" },
  { id: 70, title: "Sacred Games",             year: 2018, genre: ["Crime","Thriller","Drama"],    rating: 8.6, director: "Anurag Kashyap",          description: "A Mumbai police officer receives a cryptic call from a gangster warning that the city will be destroyed in 25 days.", poster: "https://upload.wikimedia.org/wikipedia/en/2/2b/Sacred_Games_poster.jpg", accent: "#c0392b", region: "OTT Series", type: "Series" },
];

const ALL_GENRES = ["All", ...new Set(MOVIES.flatMap((m) => m.genre))];
const ALL_TYPES  = ["All", "Movie", "Series"];
const REGIONS = [
  { id: "All",         label: "All",          emoji: "✦",  color: "#c9a96e" },
  { id: "Hollywood",   label: "Hollywood",    emoji: "🎬", color: "#e8c87a" },
  { id: "Bollywood",   label: "Bollywood",    emoji: "🎭", color: "#ff9900" },
  { id: "Racing",      label: "Racing",       emoji: "🏎️", color: "#e8000d" },
  { id: "World Cinema",label: "World Cinema", emoji: "🌍", color: "#1abc9c" },
  { id: "Animation",   label: "Animation",    emoji: "🎨", color: "#9b59b6" },
  { id: "Documentary", label: "Documentary",  emoji: "🎙️", color: "#3498db" },
  { id: "OTT Series",  label: "OTT Series",   emoji: "📺", color: "#e91e63" },
];

const getRegionColor = (regionId) => REGIONS.find(r => r.id === regionId)?.color || "#c9a96e";
export { MOVIES };

// ─── STAR RATING ──────────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 12 }) => {
  const filled = Math.round(rating / 2);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < filled ? "#f5c518" : "none"}
          stroke={i < filled ? "#f5c518" : "#2e2e2e"}
          strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ marginLeft: "6px", fontSize: "12px", color: "#f5c518", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
        {rating}
      </span>
    </div>
  );
};

// ─── MOVIE CARD ───────────────────────────────────────────────────────────────

const MovieCard = ({ movie, isWishlisted, onWishlist, index }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: "16px", overflow: "hidden",
        cursor: "pointer", background: "#0d0d0d",
        border: `1px solid ${hovered ? movie.accent + "44" : "#181818"}`,
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.8), 0 0 0 1px ${movie.accent}22, 0 0 60px ${movie.accent}10`
          : "0 4px 24px rgba(0,0,0,0.5)",
        animation: `cardReveal 0.55s ease both`,
        animationDelay: `${Math.min(index * 0.04, 0.6)}s`,
      }}
    >
      {/* Top glow line on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px", zIndex: 10,
        background: `linear-gradient(90deg, transparent 0%, ${movie.accent} 50%, transparent 100%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Poster */}
      <div style={{ position: "relative", paddingTop: "148%", overflow: "hidden" }}>
        {imgError ? (
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(145deg, ${movie.accent}22 0%, #0a0a0a 65%)`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "12px",
          }}>
            <div style={{ fontSize: "44px", opacity: 0.25 }}>🎬</div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "15px",
              color: movie.accent, textAlign: "center", padding: "0 16px", lineHeight: 1.4,
            }}>{movie.title}</span>
          </div>
        ) : (
          <img
            src={movie.poster} alt={movie.title}
            onError={() => setImgError(true)}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.4s ease",
              transform: hovered ? "scale(1.1)" : "scale(1.02)",
              filter: hovered ? "brightness(0.55) saturate(1.1)" : "brightness(0.82) saturate(0.95)",
            }}
          />
        )}

        {/* Vignette gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.6) 45%, transparent 100%)",
        }} />

        {/* Hover content overlay */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <div style={{
            background: "rgba(0,0,0,0.5)",
            border: `1px solid ${movie.accent}55`,
            borderRadius: "50%", width: "52px", height: "52px",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
            boxShadow: `0 0 30px ${movie.accent}44`,
          }}>
            <span style={{ fontSize: "20px", marginLeft: "3px" }}>▶</span>
          </div>
        </div>

        {/* Region pill */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
          border: `1px solid ${movie.accent}33`, borderRadius: "20px",
          padding: "3px 10px", fontSize: "8px",
          fontFamily: "'DM Mono', monospace", color: movie.accent,
          letterSpacing: "0.1em", textTransform: "uppercase", zIndex: 3,
        }}>
          {REGIONS.find(r => r.id === movie.region)?.emoji || "✦"} {movie.region}
        </div>

        {/* Series badge */}
        {movie.type === "Series" && (
          <div style={{
            position: "absolute", top: "38px", left: "12px",
            background: "rgba(233,30,99,0.85)", backdropFilter: "blur(6px)",
            borderRadius: "20px", padding: "2px 9px",
            fontSize: "8px", fontFamily: "'DM Mono', monospace",
            color: "#fff", letterSpacing: "0.1em",
            textTransform: "uppercase", zIndex: 3,
            fontWeight: 600,
          }}>
            📺 SERIES
          </div>
        )}

        {/* Wishlist btn */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(movie.id); }}
          style={{
            position: "absolute", top: "10px", right: "10px",
            width: "34px", height: "34px", borderRadius: "50%",
            border: `1px solid ${isWishlisted ? "#f5c518aa" : "rgba(255,255,255,0.15)"}`,
            background: isWishlisted ? "rgba(245,197,24,0.2)" : "rgba(0,0,0,0.55)",
            color: isWishlisted ? "#f5c518" : "rgba(255,255,255,0.45)",
            fontSize: "14px", cursor: "pointer",
            backdropFilter: "blur(12px)",
            transition: "all 0.25s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 3,
            transform: isWishlisted ? "scale(1.1)" : "scale(1)",
          }}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        {/* Rating */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(245,197,24,0.25)", borderRadius: "8px",
          padding: "3px 10px", fontFamily: "'DM Mono', monospace",
          fontSize: "12px", fontWeight: 700, color: "#f5c518", zIndex: 3,
        }}>
          ★ {movie.rating}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "15px 17px 18px" }}>
        <h3 style={{
          margin: "0 0 3px",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700, fontSize: "17px", lineHeight: 1.2,
          color: hovered ? movie.accent : "#f0ece3",
          transition: "color 0.3s ease", letterSpacing: "0.01em",
        }}>{movie.title}</h3>
        <p style={{
          margin: "0 0 11px", fontSize: "10px",
          fontFamily: "'DM Mono', monospace", color: "#3e3e3e", letterSpacing: "0.05em",
        }}>{movie.director} · {movie.year}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {movie.genre.map((g) => (
            <span key={g} style={{
              fontSize: "8px", fontFamily: "'DM Mono', monospace",
              color: movie.accent + "bb",
              background: movie.accent + "12",
              border: `1px solid ${movie.accent}22`,
              padding: "3px 9px", borderRadius: "20px",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ movie, isWishlisted, onWishlist, onClose }) => {
  const [imgError, setImgError] = useState(null);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!movie) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.9)", backdropFilter: "blur(24px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", animation: "fadeIn 0.2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg, #141414 0%, #0a0a0a 100%)",
        border: `1px solid ${movie.accent}2e`,
        borderRadius: "22px", maxWidth: "820px", width: "100%",
        overflow: "hidden",
        boxShadow: `0 60px 120px rgba(0,0,0,0.95), 0 0 80px ${movie.accent}12, 0 0 0 1px ${movie.accent}14`,
        animation: "modalIn 0.35s cubic-bezier(0.23,1,0.32,1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Top accent */}
        <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${movie.accent}cc, transparent)` }} />

        <div style={{ display: "flex" }}>
          {/* Poster column */}
          <div style={{ width: "250px", flexShrink: 0, position: "relative" }}>
            {imgError ? (
              <div style={{
                width: "100%", height: "100%", minHeight: "380px",
                background: `linear-gradient(145deg, ${movie.accent}20, #0a0a0a)`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "14px",
              }}>
                <div style={{ fontSize: "52px", opacity: 0.25 }}>🎬</div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: movie.accent, textAlign: "center", padding: "0 16px" }}>{movie.title}</span>
              </div>
            ) : (
              <img src={movie.poster} alt={movie.title} onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", minHeight: "380px", objectFit: "cover", display: "block" }}
              />
            )}
            {/* Fade right edge into bg */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent 55%, #0a0a0a 100%)",
            }} />
          </div>

          {/* Info column */}
          <div style={{ flex: 1, padding: "34px 34px 34px 26px", display: "flex", flexDirection: "column" }}>
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: "9px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.18em",
                  color: getRegionColor(movie.region),
                  background: getRegionColor(movie.region) + "14",
                  border: `1px solid ${getRegionColor(movie.region)}2e`,
                  padding: "5px 14px", borderRadius: "20px", textTransform: "uppercase",
                }}>
                  {REGIONS.find(r => r.id === movie.region)?.emoji || "✦"} {movie.region}
                </span>
                {movie.type === "Series" && (
                  <span style={{
                    fontSize: "9px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.18em",
                    color: "#e91e63", background: "rgba(233,30,99,0.12)",
                    border: "1px solid rgba(233,30,99,0.3)",
                    padding: "5px 14px", borderRadius: "20px", textTransform: "uppercase",
                  }}>
                    📺 Series
                  </span>
                )}
              </div>
              <button onClick={onClose} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                color: "#555", width: "34px", height: "34px", borderRadius: "50%",
                cursor: "pointer", fontSize: "18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >×</button>
            </div>

            <h2 style={{
              margin: "0 0 5px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700,
              color: "#f5f0e8", lineHeight: 1.05, letterSpacing: "-0.01em",
            }}>{movie.title}</h2>
            <p style={{
              margin: "0 0 18px",
              fontFamily: "'DM Mono', monospace", fontSize: "11px",
              color: movie.accent + "88", letterSpacing: "0.05em",
            }}>{movie.director} · {movie.year}</p>

            <StarRating rating={movie.rating} size={15} />

            <div style={{
              width: "36px", height: "1px",
              background: `linear-gradient(90deg, ${movie.accent}, transparent)`,
              margin: "20px 0",
            }} />

            <p style={{
              margin: "0 0 22px", fontSize: "13.5px", lineHeight: 1.85,
              color: "#5a5a5a", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", flex: 1,
            }}>{movie.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "26px" }}>
              {movie.genre.map(g => (
                <span key={g} style={{
                  fontSize: "9px", fontFamily: "'DM Mono', monospace",
                  color: movie.accent, background: movie.accent + "14",
                  border: `1px solid ${movie.accent}28`,
                  padding: "5px 14px", borderRadius: "20px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{g}</span>
              ))}
            </div>

            <button onClick={() => onWishlist(movie.id)} style={{
              alignSelf: "flex-start", padding: "11px 26px", borderRadius: "10px",
              border: `1px solid ${isWishlisted ? movie.accent + "77" : "rgba(255,255,255,0.1)"}`,
              background: isWishlisted ? movie.accent + "18" : "rgba(255,255,255,0.03)",
              color: isWishlisted ? movie.accent : "#444",
              fontFamily: "'DM Mono', monospace", fontSize: "11px",
              cursor: "pointer", transition: "all 0.25s ease",
              letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px",
              boxShadow: isWishlisted ? `0 4px 20px ${movie.accent}22` : "none",
            }}>
              <span>{isWishlisted ? "♥" : "♡"}</span>
              {isWishlisted ? "In Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "100px 20px" }}>
    <div style={{ fontSize: "60px", opacity: 0.15, marginBottom: "18px" }}>🎬</div>
    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#2a2a2a", marginBottom: "8px" }}>No films found</p>
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#202020", letterSpacing: "0.15em" }}>TRY ADJUSTING YOUR FILTERS</p>
  </div>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = MOVIES
    .filter(m => {
      if (showWishlistOnly && !wishlist.has(m.id)) return false;
      if (activeType !== "All" && (m.type || "Movie") !== activeType) return false;
      if (activeRegion !== "All" && m.region !== activeRegion) return false;
      if (activeGenre !== "All" && !m.genre.includes(activeGenre)) return false;
      if (search && !m.title.toLowerCase().includes(search.toLowerCase()) &&
        !m.director.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : b.year - a.year);

  const visibleGenres = (() => {
    let pool = MOVIES;
    if (activeType !== "All") pool = pool.filter(m => (m.type || "Movie") === activeType);
    if (activeRegion !== "All") pool = pool.filter(m => m.region === activeRegion);
    return ["All", ...new Set(pool.flatMap(m => m.genre))];
  })();

  const regionColor = getRegionColor(activeRegion);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Mono:wght@400;500&family=Lora:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { height: 100%; }
        body { background: #070707; color: #f0ece3; font-family: sans-serif; min-height: 100%; overflow-y: auto; overflow-x: hidden; }
        #root { min-height: 100%; overflow: visible; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        select option { background: #111; }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes fadeIn   { from { opacity: 0 }                                    to { opacity: 1 } }
        @keyframes modalIn  { from { opacity: 0; transform: scale(0.93) translateY(18px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes drift1   { 0%,100% { transform: translate(0,0)    scale(1);    } 40% { transform: translate(80px,-50px) scale(1.12); } 70% { transform: translate(-50px,40px) scale(0.92); } }
        @keyframes drift2   { 0%,100% { transform: translate(0,0)    scale(1);    } 35% { transform: translate(-60px,70px) scale(1.08); } 65% { transform: translate(90px,-40px) scale(0.95); } }
        @keyframes shimmerTitle { 0%,100% { opacity:.85 } 50% { opacity:1 } }
        @keyframes tickerMove { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        .genre-btn {
          padding: 6px 15px; border-radius: 20px; font-size: 10px;
          font-family: 'DM Mono', monospace; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer; white-space: nowrap;
          transition: all 0.22s ease; outline: none;
        }
        .genre-btn:hover { transform: translateY(-2px); }
        .search-inp { outline: none; }
        .search-inp::placeholder { color: #282828; }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "#070707" }} />
        {/* Centre radial */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "100vw", height: "65vh",
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 75%)",
        }} />
        {/* Orb 1 */}
        <div style={{
          position: "absolute", top: "5%", left: "5%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,176,75,0.13) 0%, transparent 70%)",
          filter: "blur(70px)", animation: "drift1 20s ease-in-out infinite",
        }} />
        {/* Orb 2 */}
        <div style={{
          position: "absolute", bottom: "5%", right: "3%",
          width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(142,68,173,0.09) 0%, transparent 70%)",
          filter: "blur(80px)", animation: "drift2 26s ease-in-out infinite",
        }} />
        {/* Scanlines */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.007) 3px,rgba(255,255,255,0.007) 4px)",
        }} />
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", overflow: "visible" }}>

        {/* ── TICKER ── */}
        <div style={{
          height: "28px", overflow: "hidden",
          background: `linear-gradient(90deg, ${regionColor}18, ${regionColor}08, ${regionColor}18)`,
          borderBottom: `1px solid ${regionColor}18`,
          display: "flex", alignItems: "center",
        }}>
          <div style={{ display: "flex", animation: "tickerMove 28s linear infinite", whiteSpace: "nowrap" }}>
            {[...MOVIES, ...MOVIES].map((m, i) => (
              <span key={i} style={{
                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                color: "#222", letterSpacing: "0.15em", padding: "0 28px",
                textTransform: "uppercase",
              }}>
                {m.title} <span style={{ color: regionColor + "44" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── NAVBAR ── */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 48px",
          borderBottom: "1px solid rgba(255,255,255,0.035)",
          backdropFilter: "blur(20px)",
          background: "rgba(7,7,7,0.6)",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "11px",
              background: "linear-gradient(135deg, #c9a96e 0%, #7a4e1a 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", boxShadow: "0 4px 24px rgba(201,169,110,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}>🎞</div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", color: "#c9a96e", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.8 }}>Cinephile</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 700, color: "#f0ece3", lineHeight: 1.1 }}>Film Discovery</div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", opacity: searchFocused ? 0.5 : 0.2, transition: "opacity 0.2s", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search films, directors…" value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="search-inp"
                style={{
                  padding: "9px 16px 9px 36px",
                  background: searchFocused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${searchFocused ? regionColor + "55" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "10px", color: "#d0ccc4",
                  fontFamily: "'DM Mono', monospace", fontSize: "11px",
                  width: "250px", letterSpacing: "0.03em",
                  transition: "all 0.25s ease",
                  boxShadow: searchFocused ? `0 0 20px ${regionColor}18` : "none",
                }}
              />
            </div>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              padding: "9px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px", color: "#aaa",
              fontFamily: "'DM Mono', monospace", fontSize: "11px",
              cursor: "pointer", letterSpacing: "0.04em",
            }}>
              <option value="rating">★ Rating</option>
              <option value="year">⌛ Year</option>
            </select>

            {/* Watchlist */}
            <button onClick={() => setShowWishlistOnly(p => !p)} style={{
              padding: "9px 18px", borderRadius: "10px",
              border: `1px solid ${showWishlistOnly ? "rgba(245,197,24,0.55)" : "rgba(255,255,255,0.12)"}`,
              background: showWishlistOnly ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
              color: showWishlistOnly ? "#f5c518" : "#aaa",
              fontFamily: "'DM Mono', monospace", fontSize: "11px",
              cursor: "pointer", transition: "all 0.25s ease",
              display: "flex", alignItems: "center", gap: "8px", letterSpacing: "0.06em",
              boxShadow: showWishlistOnly ? "0 4px 20px rgba(245,197,24,0.15)" : "none",
            }}>
              ♥ Watchlist
              {wishlist.size > 0 && (
                <span style={{
                  background: "#f5c518", color: "#000",
                  borderRadius: "10px", padding: "1px 8px",
                  fontSize: "9px", fontWeight: 700,
                }}>{wishlist.size}</span>
              )}
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ padding: "52px 48px 40px", position: "relative" }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: "9px",
            color: "#c9a96e", letterSpacing: "0.35em", textTransform: "uppercase",
            marginBottom: "16px", opacity: 0.75,
          }}>✦ Your Personal Cinema Guide</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 700,
            lineHeight: 0.93, letterSpacing: "-0.025em", marginBottom: "12px",
            animation: "shimmerTitle 5s ease infinite",
          }}>
            <span style={{ color: "#f5f0e8" }}>Discover </span>
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(125deg, #c9a96e 0%, #f7e09c 40%, #a8762a 80%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Extraordinary</em>
            <br /><span style={{ color: "#f5f0e8" }}>Cinema</span>
          </h1>
          <p style={{
            fontFamily: "'Lora', serif", fontStyle: "italic",
            fontSize: "14px", color: "#888",
          }}>
            {MOVIES.length} handpicked films &amp; series across Hollywood, Bollywood, Racing, World Cinema, Animation, Documentary &amp; OTT
          </p>

          {/* Decorative line */}
          <div style={{
            position: "absolute", right: "48px", top: "60px",
            width: "1px", height: "120px",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)",
          }} />
          <div style={{
            position: "absolute", right: "72px", top: "80px",
            width: "1px", height: "80px",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.15), transparent)",
          }} />
        </div>

        {/* ── FILTERS ── */}
        <div style={{ padding: "0 48px 32px" }}>

          {/* Type toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#666", letterSpacing: "0.25em", textTransform: "uppercase", marginRight: "6px", minWidth: "40px" }}>Type</span>
            {ALL_TYPES.map(t => {
              const isActive = activeType === t;
              const typeEmoji = t === "Movie" ? "🎬" : t === "Series" ? "📺" : "✦";
              const typeColor = t === "Series" ? "#e91e63" : "#c9a96e";
              return (
                <button key={t}
                  onClick={() => { setActiveType(t); setActiveGenre("All"); }}
                  style={{
                    padding: "7px 18px", borderRadius: "10px",
                    border: `1px solid ${isActive ? typeColor + "77" : "rgba(255,255,255,0.12)"}`,
                    background: isActive ? `linear-gradient(135deg, ${typeColor}25, ${typeColor}10)` : "rgba(255,255,255,0.04)",
                    color: isActive ? typeColor : "#888",
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.25s ease",
                    display: "flex", alignItems: "center", gap: "7px",
                    boxShadow: isActive ? `0 4px 22px ${typeColor}22` : "none",
                  }}
                >
                  <span>{typeEmoji}</span> {t === "All" ? "All Types" : t === "Movie" ? "Movies" : "OTT Series"}
                </button>
              );
            })}
          </div>

          {/* Region tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#666", letterSpacing: "0.25em", textTransform: "uppercase", marginRight: "6px", minWidth: "40px" }}>Region</span>
            {REGIONS.map(r => {
              const isActive = activeRegion === r.id;
              return (
                <button key={r.id}
                  onClick={() => { setActiveRegion(r.id); setActiveGenre("All"); }}
                  style={{
                    padding: "8px 20px", borderRadius: "10px",
                    border: `1px solid ${isActive ? r.color + "77" : "rgba(255,255,255,0.12)"}`,
                    background: isActive ? `linear-gradient(135deg, ${r.color}25, ${r.color}10)` : "rgba(255,255,255,0.04)",
                    color: isActive ? r.color : "#888",
                    fontFamily: "'DM Mono', monospace", fontSize: "10px",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.25s ease",
                    display: "flex", alignItems: "center", gap: "7px",
                    boxShadow: isActive ? `0 4px 22px ${r.color}22` : "none",
                  }}
                >
                  <span>{r.emoji}</span> {r.label}
                </button>
              );
            })}
          </div>

          {/* Genre pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#666", letterSpacing: "0.25em", textTransform: "uppercase", marginRight: "6px", minWidth: "40px" }}>Genre</span>
            {[
              ...visibleGenres.filter(g => g === "All"),
              ...visibleGenres.filter(g => g === "R-Rated"),
              ...visibleGenres.filter(g => g !== "All" && g !== "R-Rated"),
            ].map(g => {
              const isActive = activeGenre === g;
              const isRated = g === "R-Rated";
              return (
                <button key={g} onClick={() => setActiveGenre(g)} className="genre-btn" style={{
                  border: `1px solid ${isActive ? (isRated ? "#e8000d99" : regionColor + "77") : isRated ? "rgba(232,0,13,0.35)" : "rgba(255,255,255,0.1)"}`,
                  background: isActive ? (isRated ? "rgba(232,0,13,0.2)" : regionColor + "22") : isRated ? "rgba(232,0,13,0.08)" : "rgba(255,255,255,0.04)",
                  color: isActive ? (isRated ? "#e8000d" : regionColor) : isRated ? "#e8000dcc" : "#777",
                  boxShadow: isActive ? `0 2px 14px ${isRated ? "#e8000d" : regionColor}18` : "none",
                  fontWeight: isRated ? 600 : 400,
                }}>{isRated ? "🔞 R-Rated" : g}</button>
              );
            })}
          </div>
        </div>

        {/* ── RESULTS BAR ── */}
        <div style={{
          padding: "12px 48px 14px",
          borderTop: "1px solid rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          display: "flex", alignItems: "center", gap: "16px",
          background: "rgba(255,255,255,0.01)",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#666", letterSpacing: "0.14em" }}>
            {filtered.length} {filtered.length === 1 ? "TITLE" : "TITLES"}
            {activeType !== "All" && <span style={{ color: activeType === "Series" ? "#e91e6399" : "#c9a96e99" }}> · {activeType === "Series" ? "SERIES" : "MOVIES"}</span>}
            {activeRegion !== "All" && <span style={{ color: regionColor + "99" }}> · {activeRegion.toUpperCase()}</span>}
            {activeGenre !== "All" && <span style={{ color: "#555" }}> · {activeGenre.toUpperCase()}</span>}
            {showWishlistOnly && <span style={{ color: "#f5c51888" }}> · WATCHLIST</span>}
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,rgba(255,255,255,0.06),transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", color: "#444", letterSpacing: "0.25em" }}>
            CINEPHILE ✦ {new Date().getFullYear()}
          </span>
        </div>

        {/* ── GRID ── */}
        <main style={{ padding: "30px 48px 80px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))",
            gap: "22px",
          }}>
            {filtered.length === 0 ? <EmptyState /> : filtered.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i}
                isWishlisted={wishlist.has(movie.id)}
                onWishlist={toggleWishlist}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{
          padding: "20px 48px", borderTop: "1px solid rgba(255,255,255,0.03)",
          textAlign: "center",
          background: "rgba(255,255,255,0.01)",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#444", letterSpacing: "0.25em" }}>
            ✦ CINEPHILE · FILM DISCOVERY · MADE WITH PASSION ✦
          </span>
        </footer>
      </div>

    </>
  );
}
