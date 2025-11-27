import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrowseItem } from "@/components/BrowseItem";
import { useApp } from "@/context/AppContext";

const categories = ["All", "Physics", "Chemistry", "Biology", "Mathematics", "Astronomy"];

const mockVideos = [
  {
    id: "1",
    title: "Understanding the Doppler Effect - Physics Explained",
    description: "A comprehensive visual explanation of how sound and light waves change frequency based on relative motion between source and observer.",
    duration: "12:34",
    category: "Physics",
    views: "1.2M",
    url: "https://youtube.com/watch?v=example1",
  },
  {
    id: "2",
    title: "Wave Mechanics and Sound Propagation",
    description: "Learn how waves travel through different mediums and why the Doppler effect occurs in everyday situations.",
    duration: "8:45",
    category: "Physics",
    views: "890K",
    url: "https://youtube.com/watch?v=example2",
  },
  {
    id: "3",
    title: "DNA Replication Process Animated",
    description: "Watch the complete process of DNA replication unfold in this detailed molecular animation.",
    duration: "15:22",
    category: "Biology",
    views: "2.1M",
    url: "https://youtube.com/watch?v=example3",
  },
  {
    id: "4",
    title: "Chemical Bonding Visualized",
    description: "Understand ionic, covalent, and metallic bonds through beautiful 3D visualizations.",
    duration: "10:15",
    category: "Chemistry",
    views: "1.5M",
    url: "https://youtube.com/watch?v=example4",
  },
  {
    id: "5",
    title: "Black Holes: A Visual Journey",
    description: "Explore the mysteries of black holes, event horizons, and gravitational effects on spacetime.",
    duration: "18:30",
    category: "Astronomy",
    views: "3.4M",
    url: "https://youtube.com/watch?v=example5",
  },
  {
    id: "6",
    title: "Calculus Fundamentals Animated",
    description: "Master derivatives and integrals through intuitive visual explanations and animations.",
    duration: "22:10",
    category: "Mathematics",
    views: "980K",
    url: "https://youtube.com/watch?v=example6",
  },
  {
    id: "7",
    title: "Photosynthesis: The Complete Process",
    description: "Follow the journey of a photon as it powers the creation of glucose in plant cells.",
    duration: "14:05",
    category: "Biology",
    views: "1.8M",
    url: "https://youtube.com/watch?v=example7",
  },
  {
    id: "8",
    title: "Quantum Mechanics for Beginners",
    description: "Demystifying wave-particle duality, superposition, and quantum entanglement.",
    duration: "25:40",
    category: "Physics",
    views: "4.2M",
    url: "https://youtube.com/watch?v=example8",
  },
];

export default function Browse() {
  const { currentPrompt } = useApp();
  const [searchQuery, setSearchQuery] = useState(currentPrompt || "");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Videos</h1>
          <p className="text-muted-foreground mt-1">
            Discover educational content related to your interests
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-browse"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <BrowseItem
                key={video.id}
                title={video.title}
                description={video.description}
                duration={video.duration}
                category={video.category}
                views={video.views}
                url={video.url}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos found matching your search.</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredVideos.length} of {mockVideos.length} educational videos
          </p>
        </div>
      </div>
    </div>
  );
}
