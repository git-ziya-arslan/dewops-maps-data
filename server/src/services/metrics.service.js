let counters = { search: 0, details: 0 };
export const Metrics = {
inc: (k) => { counters[k] = (counters[k] || 0) + 1; },
get: () => ({ ...counters })
};
