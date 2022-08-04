require 'faker'
# require 'rest-client'


LOCATION_KEY = {
    "Beijing" => 101924, "Berlin" => 178087 ,"Cairo" => 127164,"Madrid" => 308526 ,"London" => 328328, "Athens" => 182536, "Hong Kong" => 1123655, "Baghdad" => 207375,
    "Tokyo" => 226396, "Pyongyang" => 225058, "Seoul" => 226081, "Mexico City" => 242560, "Moscow" => 294021, "Singapore" => 300597, "Sydney" => 22889, "Istanbul" => 318251,
    "Los Angeles" => 347625, "New York" => 349727, "Buenos Aires" => 7894, "Vienna" => 31868, "Brasília" => 43348, "Prague" => 125594, "Paris" => 623,
    "Budapest" => 187423, "Rome" => 213490, "Manila" => 264885, "Warsaw" => 274663, "Bucharest" => 287430, "Cape Town" => 306633, "São Paulo" => 45881, "Toronto" => 55488,
    "Barcelona" => 307297, "Montreal" => 56186, "Chicago" => 348308, "Dallas" => 351194, "Copenhagen" => 123094, "Helsinki" => 133328, "Dublin" => 207931, "Jerusalem" => 213225,
    "Amsterdam" => 249758, "Panama City" => 259549, "Lisbon" => 274087, "Stockholm" => 314929, "Denver" => 347810, "Honolulu" => 348211, "Vancouver" => 53286, "Anchorage" => 346835, "San Francisco" => 347629,
    "Miami" => 347936, "Seattle" => 351409
}
city = ["Beijing", "Berlin", "Beijing", "Madrid", "Beijing", "Hong Kong", "Hong Kong", "Berlin", "Los Angeles", "New York"]

images = [
    "https://wallpaper.dog/large/5535465.jpg",
    "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80",
    "https://images.unsplash.com/photo-1509514026798-53d40bf1aa09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZnJlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549989317-6f14743af1bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGZyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://media.istockphoto.com/photos/woman-work-in-vacation-remotely-picture-id1340056081?b=1&k=20&m=1340056081&s=170667a&w=0&h=iUqkSSPmwtt3jZfR50np0JhQjiF3KwAkGcEzPU_nk5E=",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
]

i = 0;
j = 1;
z = 1;

User.create(
    name: "#{Faker::Name.initials(number: 2)}#{rand(1..9)}#{rand(1..9)}#{rand(1..9)}#{rand(1..9)}",
    password: "1234",
  )
10.times do
    Story.create(
        city: city[i],
        month: "0#{rand(1..9)}",
        day: "#{rand(1..30)}",
        year: "#{rand(2000..2020)}",
        image: "#{images[i]}",
        content: Faker::GreekPhilosophers.quote,
        user_id: 1
    )
    i += 1

    3.times do
        ToDoList.create(
        task: Faker::JapaneseMedia::OnePiece.quote,
        story_id: j
    )
    end

    Password.create(
        code: "#{j}",
        story_id: j
    )
    j += 1

end

LOCATION_KEY.each do |key, value|
    Location.create(
     name: "#{key}",
     key: "#{value}"
    )
 end
icon_day = [
    "sunny", "mostly_sunny", "partly_sunny", "intermittent_clouds", "hazy_sunshine",
    "mostly_cloudy", "cloudy", "dreary", "fog", "showers", "mostly_cloudy_w:showers",
    "partly_sunny_w:showers", "t-storms", "mostly_cloudy_w:t-storms", "partly_sunny_w:t-storms",
    "rain", "flurries", "mostly_cloudy_w:flurries", "partly_sunny_w:flurries", "snow", "mostly_cloudy_w:snow",
    "ice", "sleet", "freezing_rain", "rain_and_snow", "hot", "cold", "windy"]

icon_night = [
    "cloudy", "dreary", "fog", "showers", "t-storms", "rain", "flurries", "snow",
    "ice", "sleet", "freezing_rain", "rain_and_snow", "hot", "cold", "windy",
    "clear", "mostly_clear", "partly_cloudy", "intermittent_clouds", "hazy_moonlight",
    "mostly_cloudly", "partly_cloudy_w:showers", "mostly_cloudy_w:showers", "partly_cloudy_w:t-storms",
    "mostly_cloudy_w:t-storms", "mostly_cloudy_w:flurries", "mostly_cloudy_w:snow"]

happy = ["sick","excited", "fraustrated", "humbled"];
h = 1;

10.times do 
    Weather.create(
        min: rand(20..60),
        max: rand(60..110),
        icon_day: "#{icon_day[rand(0..27)]}",
        icon_night: "#{icon_night[rand(0..26)]}",
        location_id: 1,
        story_id: h
    )

    Mood.create(
        feeling: "#{happy[rand(0..3)]}",
        one_liner:  Faker::Quotes::Shakespeare.hamlet_quote,
        story_id: h
    )
    h += 1;
end



