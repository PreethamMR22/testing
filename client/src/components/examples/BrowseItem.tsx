import { BrowseItem } from "../BrowseItem";

export default function BrowseItemExample() {
  return (
    <div className="w-full max-w-2xl space-y-3">
      <BrowseItem
        title="Understanding the Doppler Effect - Physics Explained"
        description="A comprehensive visual explanation of how sound and light waves change frequency based on relative motion between source and observer."
        duration="12:34"
        category="Physics"
        views="1.2M"
        url="https://youtube.com/watch?v=example1"
      />
      <BrowseItem
        title="Wave Mechanics and Sound Propagation"
        description="Learn how waves travel through different mediums and why the Doppler effect occurs."
        duration="8:45"
        category="Physics"
        views="890K"
        url="https://youtube.com/watch?v=example2"
      />
    </div>
  );
}
