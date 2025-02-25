# Translation Key Audit

## Key Patterns

The application uses the following translation key patterns:

1. **Hierarchical Structure**:
   - Top-level keys represent major sections or features (`nav`, `blog`, `finance`, etc.)
   - Second-level keys represent specific elements or subsections
   - Example: `blog.categories.product`

2. **Common Patterns**:
   - `*.title` - Section or component titles
   - `*.description` - Descriptive text
   - `*.button` - Button text
   - `*.placeholder` - Input placeholders
   - `*.error` - Error messages

3. **Metadata Pattern**:
   - `meta.*.title` - Page titles
   - `meta.*.description` - Meta descriptions

## Consistency Issues

1. **Inconsistent Casing**:
   - Some keys use camelCase: `readMore`
   - Others use snake_case: `latest_read`
   - Recommendation: Standardize on camelCase for all keys

2. **Duplicate Concepts**:
   - `nav.home` and `home.title` both exist
   - Recommendation: Use `home.title` for the page title and `nav.home` for navigation link

3. **Missing Keys**:
   - Some components use hardcoded English text
   - Recommendation: Add missing keys for all user-facing text

4. **Unused Keys**:
   - Several keys in the translation files are not used in components
   - Recommendation: Remove or repurpose unused keys

## Recommendations

1. **Standardize Key Structure**:
   - Use `page.section.element` pattern consistently
   - Example: `blog.post.readMore` instead of `blog.read_more`

2. **Add Component Documentation**:
   - Document which translation keys each component uses
   - Add JSDoc comments to clarify component purposes

3. **Create Translation Guide**:
   - Document naming conventions for new translation keys
   - Provide context for translators

4. **Implement Translation Validation**:
   - Add tests to ensure all keys are used and defined
   - Check for missing translations in non-primary languages

## Action Items

1. Rename inconsistent keys to follow camelCase pattern
2. Add missing translations for hardcoded text
3. Remove unused translation keys
4. Update components to use consistent key patterns
5. Document translation key usage in component JSDoc comments 