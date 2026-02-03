import { wpClient } from "@/app/http";

/**
 * Fetches dam releases for a given reach using a two-step WordPress API process.
 *
 * Step 1: Query tribe_events filtering by reachid and tribe_events_cat = [12832] (Dam Releases)
 * Step 2: Query ../tribe/events/v1/events with the IDs from step 1 to get full event details
 *
 * @param {string} wpID - The WordPress ID for the reach (reachid)
 * @returns {Promise<Array>} Array of dam release events with full details
 */
export async function getDamReleases(wpID) {
  // Step 1: Get event IDs filtered by reachid and tribe_events_cat = 12832 (Dam Releases category)
  const step1Response = await wpClient.get("tribe_events", {
    params: {
      reachid: wpID,
      tribe_events_cat: 12832,
      per_page: 100, // Fetch up to 100 events
      _fields: "id", // Only need IDs for the second request
    },
  });

  const events = step1Response.data;

  // If no events found, return empty array
  if (!events || events.length === 0) {
    return [];
  }

  // Extract IDs from step 1 results
  const eventIds = events.map((event) => event.id).join(",");

  // Step 2: Get full event details from tribe/events/v1/events endpoint
  const step2Response = await wpClient.get("../../tribe/events/v1/events", {
    params: {
      include: eventIds,
      per_page: 100,
    },
  });

  return step2Response.data.events || [];
}
